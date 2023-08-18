import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import UserIcon from '../assets/circle-user.svg';
// import useAuth from '../hooks/useAuth';
import { LanguageType, SnippetType } from '../types';
import RootLayout from './RootLayout';

import '../utils/imports/ace-languages';
import '../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';
import SearchBox from '../components/SearchBox';

export const Snippet = ({
  snippet,
  mode,
}: {
  snippet: SnippetType;
  mode: string;
}) => {
  return (
    <div className="bg-gray-200 shadow p-3 rounded-xl">
      <h3 className="text-xl font-medium">{snippet.title}</h3>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-x-2 items-center">
          <img src={UserIcon} className="w-6" alt="" />
          <p className="text-md">{snippet.owner}</p>
        </div>
        <div>
          <p className="text-md">
            {new Date(snippet.created_at)
              .toUTCString()
              .split(' ')
              .slice(0, 4)
              .join(' ')}
          </p>
        </div>
      </div>

      <div className="bg-white mt-3">
        <div className="flex flex-wrap justify-between items-center p-1">
          <p className="text-md rounded-md text-black font-medium px-2">
            {snippet.language}
          </p>

          <div className="flex gap-x-2 flex-wrap">
            {snippet.tags.map((tag, index) => (
              <p
                className="px-2 round bg-gray-300 text-black rounded-md"
                key={index}
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <Link to={`/p/${snippet.uid}`} className="cursor-pointer">
          <AceEditor
            className="cursor-pointer"
            mode={mode}
            theme={snippet.theme}
            width="100%"
            height="170px"
            fontSize={18}
            value={snippet.source_code + '.....'}
            readOnly={true}
            highlightActiveLine={false}
          />
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  // const { auth } = useAuth();
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [searchParams] = useSearchParams();

  // if search params change set snippets to new data

  const getAllPublicSnippets = async () => {
    try {
      const q = searchParams.get('q') || '';
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';

      const response = await axios.get(
        `/snippets/public?q=${q}&page=${page}&limit=${limit}`
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
    getAllPublicSnippets();
  }, [searchParams]);

  useEffect(() => {
    getAllPublicSnippets();
  }, []);

  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto mt-5 flex flex-col gap-y-5 px-3 lg:px-0">
        <div className="block md:hidden flex-shrink flex-grow-0 justify-start">
          <SearchBox />
        </div>

        {snippets.slice(0, 3).map((snippet: SnippetType, index: number) => (
          <Snippet
            snippet={snippet}
            mode={
              languages.find((language) => language.name === snippet.language)
                ?.mode as string
            }
            key={index}
          />
        ))}
      </div>
    </RootLayout>
  );
};

export default Home;
