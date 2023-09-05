import { ChangeEvent, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { Toaster } from 'react-hot-toast';
import CreateableReactSelect from 'react-select/creatable';

import LoadingGIF from '../../assets/loading.gif';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

import axios from '../../api/axios';
import SnippetLayout from './SnippetLayout';

import { useNavigate, useParams } from 'react-router-dom';
import tags from '../../lib/data/tags';
import { LanguageType, ThemeType } from '../../types';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const uid = params.id;

  const [snippet, setSnippet] = useState<any>({});

  const options: { value: string; label: string }[] = [];
  const defaultOptions: { value: string; label: string }[] = [];

  tags.forEach((tag: string) => {
    options.push({ value: tag, label: tag });
  });

  const [pending, setPending] = useState<boolean>(false);
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [themes, setThemes] = useState<ThemeType[]>([]);

  // const initialFormData: formDataType = {
  //   title: '',
  //   language: undefined,
  //   source_code: '',
  //   theme: 'monokai',
  //   visibility: undefined,
  //   pass_code: undefined,
  //   tags: [],
  // };

  // const [formData, setSnippet] = useState(initialFormData);
  const [mode, setMode] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/data/languages');
        // console.log(response.data.data.languages);
        setLanguages(response.data.data.languages);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get('/data/themes');
        setThemes(response.data.data.themes);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get(`/snippets/${uid}/edit`);
        let _snippet = response.data.data.snippet;
        console.log(_snippet);
        setSnippet(_snippet);
        _snippet.tags.forEach((tag: string) => {
          options.push({ value: tag, label: tag });
          defaultOptions.push({ value: tag, label: tag });
        });
        console.log('_Snippet_Tags:', options);
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 403) {
        } else if (error.response.status === 404) {
          navigate('/404');
        }
      }
    })();
  }, []);

  useEffect(() => {
    console.log('snippet-language: ', snippet.language);
    if (snippet && snippet.language !== undefined) {
      const selectedLanguage = languages.find(
        (lang) => lang.ext === snippet.language
      ) as LanguageType;
      // setMode(selectedLanguage.mode);

      console.log(selectedLanguage);
    }
  }, [snippet.language]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // set it with function with prevState
    setSnippet((prevState: any) => ({
      ...prevState,
      title: event.target.value,
    }));
    console.log(snippet);
  };

  // const axiosPrivate = useAxiosPrivate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    console.log(snippet);
  };

  return (
    <SnippetLayout>
      <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Create a Snippet|
        </h1>
      </div>
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

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={snippet.title}
              onChange={(e) =>
                // setSnippet({
                //   ...snippet,
                //   title: e.target.value,
                // })
                handleTitleChange(e)
              }
              placeholder="Enter title"
              className="w-full px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="visibility" className="block mb-1 font-bold">
              Visibility
            </label>
            <select
              name="visibility"
              id="visibility"
              className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
              value={snippet.visibility}
              required
              onChange={(e) =>
                setSnippet({
                  ...snippet,
                  visibility: parseInt(e.target.value),
                })
              }
            >
              <option value="">Select visibility</option>
              <option value="1">Public</option>
              <option value="2">Private</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
          <div className="mb-4">
            <label htmlFor="theme" className="block mb-1 font-bold">
              Theme
            </label>
            <select
              name="theme"
              id="theme"
              className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
              value={snippet.theme}
              required
              onChange={(e) =>
                setSnippet({ ...snippet, theme: e.target.value })
              }
            >
              <option value="">Select a theme</option>
              <optgroup label="Light">
                {themes.map(
                  (theme: ThemeType, index: number) =>
                    !theme.is_dark && (
                      <option key={index} value={theme.value}>
                        {theme.name}
                      </option>
                    )
                )}
              </optgroup>
              <optgroup label="Dark">
                {themes.map(
                  (theme: ThemeType, index: number) =>
                    theme.is_dark && (
                      <option key={index} value={theme.value}>
                        {theme.name}
                      </option>
                    )
                )}
              </optgroup>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block mb-1 font-bold">
              Language
            </label>
            <select
              name="language"
              id="language"
              className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
              value={snippet.language}
              onChange={(e) => {
                setSnippet({
                  ...snippet,
                  language: e.target.value,
                });
              }}
              required
            >
              <option value="">Select a language</option>
              {languages.map((lang: LanguageType, index: number) => (
                <option key={index} value={lang.ext} data-mode={lang.mode}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="sourceCode" className="block mb-1 font-bold">
            Source Code
          </label>
          <AceEditor
            className="font-fira-code"
            value={snippet.source_code}
            mode={snippet.mode}
            theme={snippet.theme}
            fontSize={18}
            width="100%"
            height="800px"
            onChange={(value) =>
              setSnippet({
                ...snippet,
                source_code: value,
              })
            }
          />
        </div>

        <div className="mb-4">
          <label htmlFor="_tags" className="block mb-1 font-bold">
            Tags (comma-separated)
            <span className="ml-1 font-normal text-gray-500">optional</span>
          </label>
          <CreateableReactSelect
            isMulti
            defaultValue={defaultOptions}
            options={options}
            onChange={(e) => {
              const selectedValues = e.map((option) => option.value);
              console.log(selectedValues);
              setSnippet({
                ...snippet,
                tags: selectedValues,
              });
            }}
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
              <img src={LoadingGIF} alt="Loading" className="w-5 h-5 mr-2" />
              Creating...
            </div>
          ) : (
            'Create'
          )}
        </button>
      </form>
    </SnippetLayout>
  );
};

export default Edit;
