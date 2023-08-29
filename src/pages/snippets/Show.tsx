import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AceEditor from 'react-ace';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

import axios from '../../api/axios';
import CopyButton from '../../components/CopyButton';
import ShareButton from '../../components/ShareButton';
import SnippetLayout from './SnippetLayout';

const Show = () => {
  const [snippet, setSnippet] = useState<any>({});

  const params = useParams();
  const uid = params.id;

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/snippets/${uid}`);
        console.log(response.data.data.snippet);
        setSnippet(response.data.data.snippet);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 403) {
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

  return (
    <SnippetLayout>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-2 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{snippet.title}</h1>
            <ShareButton uid={snippet.uid} />
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
        <div className="flex flex-col md:text-right">
          <p className="text-black mb-2">
            <span className="font-semibold">Created at: </span>
            {formattedDate(snippet.created_at)}
          </p>
          <p className=" mb-4">
            <span className="text-black font-semibold">Owner: </span>
            <span className="text-gray-700">{snippet.owner}</span>
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
        readOnly
        mode={snippet.mode}
        theme={snippet.theme}
        fontSize={18}
        width="100%"
        height="800px"
      />{' '}
    </SnippetLayout>
  );
};

export default Show;
