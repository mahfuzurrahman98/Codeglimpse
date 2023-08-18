import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AceEditor from 'react-ace';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

import axios from '../../api/axios';
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

  return (
    <SnippetLayout>
      <div className="mx-auto py-7 px-3 lg:px-0 max-w-5xl">
        <div className="mb-4">
          <AceEditor
            className="font-fira-code pt-3"
            mode={snippet.mode}
            theme={snippet.theme}
            width="100%"
            height="800px"
            fontSize={18}
            value={snippet.source_code}
            readOnly={true}
          />
        </div>
      </div>
    </SnippetLayout>
  );
};

export default Show;
