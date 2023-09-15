import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingGIF from '../../assets/loading.gif';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SnippetType, statusType } from '../../types';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';
import ComponentLoader from '../../components/ComponentLoader';
import SnippetLayout from './SnippetLayout';

const Home = () => {
  // const { auth } = useAuth();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSnippetId, setDeleteSnippetId] = useState<string>('');
  const [pending, setPending] = useState<boolean>(false);
  const [status, setStatus] = useState<statusType>({
    loading: true,
    error: null,
  });

  // if search params change set snippets to new data
  const axiosPrivate = useAxiosPrivate();

  const getAllMySnippets = async () => {
    try {
      const q = searchParams.get('q') || '';
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';

      const response = await axiosPrivate.get(
        `/snippets/my?q=${q}&page=${page}&limit=${limit}`
      );
      setSnippets(response.data.data.snippets);
    } catch (error) {
      setSnippets([]);
      console.log(error);
    }
  };

  const deleteSnippet = async () => {
    try {
      await axiosPrivate.delete(`/snippets/${deleteSnippetId}`);
      await getAllMySnippets();
      setIsModalOpen(false);
      setPending(false);
      toast.success('Snippet deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    (async () => {
      await getAllMySnippets();
      setStatus({
        loading: false,
        error: null,
      });
    })();
  }, [searchParams]);

  return (
    <ComponentLoader
      status={status}
      component={
        <SnippetLayout>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
            }}
          />
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2">
              <div className="bg-white max-w-lg w-full p-5 rounded-lg shadow-2xl">
                <div className="border-b mb-3">
                  <h2 className="text-xl font-bold mb-4">Delete snippet</h2>
                </div>
                <div>
                  <p className="text-gray-700">
                    Are you sure you want to delete this snippet?
                  </p>
                </div>
                <div className="mt-3">
                  {!pending && (
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setDeleteSnippetId('');
                      }}
                      className="px-3 py-1 text-white bg-gray-500 hover:bg-gray-600 rounded mr-3"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setPending(true);
                      deleteSnippet();
                    }}
                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                  >
                    {pending ? (
                      <div className="flex items-center gap-x-1">
                        <span>
                          <img
                            src={LoadingGIF}
                            alt="Loading"
                            className="w-5 h-5"
                          />
                        </span>
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  {snippets.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse border-black border-2">
                      <thead className="text-white bg-black">
                        <tr className="text-md font-bold rounded-t-md">
                          <th className="py-2 pl-4 text-left">Title</th>
                          <th className="py-2 text-left">Language</th>
                          <th className="py-2">Created at</th>
                          <th className="py-2 pr-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {snippets.map((snippet: SnippetType, index: number) => (
                          <tr key={index} className="bg-gray-200 border-b-2 border-b-black">
                            <td className="py-3 pl-4 font-semibold">
                              {snippet.title}
                            </td>
                            <td className="py-3">{snippet.language}</td>
                            <td className="py-3 text-center">{snippet.created_at}</td>
                            <td className="py-3 px-4 space-x-4 flex justify-end text-sm">
                              <Link
                                to={`/p/${snippet.uid}/edit`}
                                className="bg-black text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-300 ease-in-out"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setDeleteSnippetId(snippet.uid);
                                }}
                                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex items-center justify-center min-h-[70vh]">
                      <p className="text-gray-800 text-2xl">
                        You don't have any snippets
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SnippetLayout>
      }
    />
  );
};

export default Home;
