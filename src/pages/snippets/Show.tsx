import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { SnippetType } from '../../types';

const Show = () => {
  const [snippet, setSnippet] = useState<SnippetType | null>(null);
  const params = useParams();
  const uid = params.id;

  useEffect(() => {
    // self invoking function
    (async () => {
      try {
        const response = await axios.get(`/snippets/${uid}`);
        console.log(response.data.data.snippet);
        setSnippet(response.data.data.snippet);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <pre>
        <code>{snippet?.source_code}</code>
      </pre>
    </div>
  );
};

export default Show;
