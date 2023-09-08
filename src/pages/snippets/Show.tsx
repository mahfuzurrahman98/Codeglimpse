import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingGIF from '../../assets/loading.gif';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

import toast from 'react-hot-toast';
import axios from '../../api/axios';
import CopyButton from '../../components/CopyButton';
import ShareButton from '../../components/ShareButton';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SnippetLayout from './SnippetLayout';

const Show = () => {
  const params = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const uid = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snippet, setSnippet] = useState<any>({});
  const [formData, setFormData] = useState({
    pass_code: '',
  });
  const [pending, setPending] = useState<boolean>(false);

  const isNotEmpty = (obj: any) => {
    return Object.keys(obj).length !== 0;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get(`/snippets/${uid}`);
        console.log(response.data.data.snippet);
        setSnippet(response.data.data.snippet);
        setIsModalOpen(false);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 403) {
          setIsModalOpen(true);
        } else if (error.response.status === 404) {
          navigate('/404');
        }
      }
    })();
  }, []);

  const formattedDate = (_date: string) => {
    return _date
      ? new Date(_date).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'Unknown Date';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    console.log(formData);

    try {
      const response = await axios.post(`/snippets/private/${uid}`, formData);
      // console.log(response.data.detail);
      toast.success(response.data.detail);
      setSnippet(response.data.data.snippet);
      setIsModalOpen(false);
    } catch (err: any) {
      // console.log(err);
      // console.log(err.response.data.detail);
      toast.error(err.response.data.detail);
    } finally {
      setPending(false);
    }
  };

  return (
    <SnippetLayout>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2">
          <div className="bg-white max-w-lg w-full p-5 rounded-lg shadow-2xl">
            <div className="border-b mb-3">
              <h2 className="text-xl font-bold mb-4">Private snippet</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="passcode" className="block mb-1 font-bold">
                  Passcode
                </label>
                <input
                  type="text"
                  name="passcode"
                  id="passcode"
                  value={formData.pass_code}
                  onChange={(e) =>
                    setFormData({ ...formData, pass_code: e.target.value })
                  }
                  placeholder="Enter the passcode"
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
                  required
                />
              </div>
              <button
                type="submit"
                className={`px-4 py-1 text-white rounded hover:bg-gray-600 ${
                  pending ? 'bg-gray-700' : 'bg-black '
                }`}
                disabled={pending}
              >
                {pending ? (
                  <div className="flex items-center">
                    <img
                      src={LoadingGIF}
                      alt="Loading"
                      className="w-5 h-5 mr-2"
                    />
                    Processing...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>

            <div className="mt-3">
              <Link to="/" className="text-black underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {isNotEmpty(snippet) ? (
        <>
          <div className="">
            <div>
              <div className="flex items-center gap-x-2 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {snippet.title}
                </h1>
                <ShareButton uid={snippet.uid} />
              </div>
              <div className="flex flex-col">
                <p className="text-black mb-2">
                  <span className="font-semibold">Created at: </span>
                  {formattedDate(snippet.created_at)}
                </p>
                <p className=" mb-4">
                  <span className="text-black font-semibold">Owner: </span>
                  <span className="text-gray-700">{snippet.owner}</span>
                </p>
              </div>
              <p className="text-black mb-4">
                <span className="font-semibold">Tags:</span>
                {snippet.tags &&
                  snippet.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-[.15rem] bg-gray-300 text-gray-800 rounded-md ml-2"
                    >
                      {tag}
                    </span>
                  ))}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-700 py-1 px-3 rounded-t-md">
            <span className="text-white">{snippet.language}</span>
            <CopyButton sourceCode={snippet.source_code} />
          </div>
          <AceEditor
            className="font-fira-code"
            value={snippet.source_code}
            mode={snippet.mode}
            theme={snippet.theme}
            fontSize={18}
            width="100%"
            height="800px"
            readOnly={true}
          />
        </>
      ) : null}
    </SnippetLayout>
  );
};

export default Show;
