import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import useAuth from '../../hooks/useAuth';
import { LanguageType, SnippetType } from '../../types';
import RootLayout from '../RootLayout';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

const Home = () => {
  // const { auth } = useAuth();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [searchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

    try {
      const response = await axios.get('/data/languages');
      setLanguages(response.data.data.languages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMySnippets();
  }, [searchParams]);

  useEffect(() => {
    getAllMySnippets();
  }, []);

  return (
    /*
    languages.find((language) => language.name === snippet.language)
                ?.mode as string
                */
    <RootLayout>
      <>
        <div className="">
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam a metus eu nulla dignissim malesuada.
                </p>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-5 flex flex-col gap-y-5 px-3 lg:px-0 ">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium"
                        >
                          Language
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-md font-medium"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {snippets.map((snippet: SnippetType, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {snippet.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {snippet.language}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              onClick={openModal}
                              className="text-blue-500 hover:text-blue-700"
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
        </div>
      </>
    </RootLayout>
  );
};

export default Home;
