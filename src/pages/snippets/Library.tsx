import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import useAuth from '../../hooks/useAuth';
import { SnippetType } from '../../types';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';
import SnippetLayout from './SnippetLayout';

const Home = () => {
  // const { auth } = useAuth();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [searchParams] = useSearchParams();

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // if search params change set snippets to new data
  const axiosPrivate = useAxiosPrivate();

  const getAllMySnippets = async () => {
    try {
      const q = searchParams.get('q') || '';
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';

      const response = await axiosPrivate.get(
        `/snippets/my/?q=${q}&page=${page}&limit=${limit}`
      );
      setSnippets(response.data.data.snippets);
    } catch (error) {
      setSnippets([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMySnippets();
  }, [searchParams]);

  useEffect(() => {
    getAllMySnippets();
  }, []);

  return (
    <SnippetLayout>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-bold"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-bold"
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-md font-bold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {snippets.map((snippet: SnippetType, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                        {snippet.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {snippet.language}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                        <a
                          // onClick={openModal}
                          className="text-red-500 hover:text-blue-700"
                          href="#"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SnippetLayout>
  );
};

export default Home;
