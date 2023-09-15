import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import UserIcon from '../assets/circle-user.svg';
import PlusIcon from '../assets/plus.svg';
import { SnippetType, statusType } from '../types';
import RootLayout from './RootLayout';

import '../utils/imports/ace-languages';
import '../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';
import ComponentLoader from '../components/ComponentLoader';
import { Pagination } from '../components/Pagination';
import SearchBox from '../components/SearchBox';

type _SnippetType = SnippetType & { mode: string };

const _limit = 1;

export const Snippet = ({ snippet }: { snippet: _SnippetType }) => {
  return (
    <div className="bg-gray-100 shadow p-3 rounded-xl">
      <h3 className="text-xl font-bold">{snippet.title}</h3>
      <div className="flex flex-col md:flex-row md:justify-between mt-3">
        <div className="flex gap-x-2 items-center">
          <img src={UserIcon} className="w-6" alt="" />
          <p className="text-md font-semibold">{snippet.owner}</p>
        </div>
        <div className="mt-2 md:mt-0 md:ml-2">
          <p className="text-md">
            {new Date(snippet.created_at).toUTCString()}
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
  const [snippets, setSnippets] = useState<_SnippetType[]>([]);
  const [totalSnippets, setTotalSnippets] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [status, setStatus] = useState<statusType>({
    loading: true,
    error: null,
  });

  // if search params change set snippets to new data
  const getAllPublicSnippets = async () => {
    try {
      const q = searchParams.get('q') ? searchParams.get('q') : '' || '';
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || _limit;

      const response = await axios.get(
        `/snippets?q=${q}&page=${page}&limit=${limit}`
      );
      setSnippets(response.data.data.snippets);
      setTotalSnippets(response.data.data.total);
    } catch (error) {
      setSnippets([]);
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllPublicSnippets();
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
        <RootLayout>
          <div className="block md:hidden flex-shrink flex-grow-0 justify-start">
            <SearchBox />
          </div>

          {snippets.map((snippet: _SnippetType, index: number) => (
            <Snippet snippet={snippet} key={index} />
          ))}

          <div className="flex justify-center items-center mt-5">
            <Pagination
              totalSnippets={totalSnippets}
              searchParams={searchParams}
            />
          </div>

          <div
            className={`${
              showTooltip ? 'block' : 'hidden'
            } fixed bottom-24 right-5 bg-gray-800 text-white px-2 py-1 rounded-md z-50`}
          >
            Create new
          </div>

          <div
            className="fixed bottom-10 right-5 z-50"
            onMouseOver={() => {
              setShowTooltip(true);
            }}
            onMouseLeave={() => {
              setShowTooltip(false);
            }}
          >
            <div className="flex items-center">
              <Link
                to="/p/new"
                className="flex items-center px-[10px] py-[8px] md:px-[12px] md:py-[10px] hover:bg-gray-200 rounded-full bg-white border-2 border-black"
              >
                <span>
                  <img src={PlusIcon} className="w-6 md:w-8" alt="" />
                </span>
              </Link>
            </div>
          </div>
        </RootLayout>
      }
    />
  );
};

export default Home;
