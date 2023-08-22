import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import UserIcon from '../assets/circle-user.svg';
// import useAuth from '../hooks/useAuth';
import { SnippetType } from '../types';
import RootLayout from './RootLayout';

import '../utils/imports/ace-languages';
import '../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';
import SearchBox from '../components/SearchBox';

type _SnippetType = SnippetType & { mode: string };

export const Snippet = ({ snippet }: { snippet: _SnippetType }) => {
  return (
    <div className="bg-gray-100 shadow p-3 rounded-xl">
      <h3 className="text-xl font-bold">{snippet.title}</h3>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-x-2 items-center">
          <img src={UserIcon} className="w-6" alt="" />
          <p className="text-md font-semibold">{snippet.owner}</p>
        </div>
        <div>
          <p className="text-md">
            {
              new Date(snippet.created_at).toUTCString()
              // .split(' ')
              // .slice(0, 4)
              // .join(' ')
            }
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="bg-gray-600 flex flex-wrap justify-between items-center px-1 py-[.4rem] rounded-t-md">
          <p className="text-md text-white rounded-md font-bold px-2">
            {snippet.language}
          </p>

          <div className="flex gap-x-2 flex-wrap">
            {snippet.tags.map((tag, index) => (
              <p
                className="px-2 round bg-gray-200 text-black rounded-md"
                key={index}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <AceEditor
          className="font-fira-code"
          mode={snippet.mode}
          theme={snippet.theme}
          width="100%"
          height="170px"
          fontSize={16}
          value={snippet.source_code + '.....\n'}
          readOnly={true}
          highlightActiveLine={false}
        />
        <div className="text-right pr-2">
          <Link
            to={`/p/${snippet.uid}`}
            className="text-blue-600 underline text-right"
          >
            show more
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  // const { auth } = useAuth();
  const [snippets, setSnippets] = useState<_SnippetType[]>([]);
  const [searchParams] = useSearchParams();

  // if search params change set snippets to new data

  const getAllPublicSnippets = async () => {
    try {
      const q = searchParams.get('q') || '';
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';

      const response = await axios.get(
        `/snippets/?q=${q}&page=${page}&limit=${limit}`
      );
      setSnippets(response.data.data.snippets);
    } catch (error) {
      setSnippets([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPublicSnippets();
  }, [searchParams]);

  return (
    <RootLayout>
      <div className="max-w-4xl w-full mt-5 flex flex-col mx-auto gap-y-5 px-3 lg:px-0">
        <div className="block md:hidden flex-shrink flex-grow-0 justify-start">
          <SearchBox />
        </div>

        {snippets.map((snippet: _SnippetType, index: number) => (
          <Snippet snippet={snippet} key={index} />
        ))}
      </div>
    </RootLayout>
  );
};

export default Home;
