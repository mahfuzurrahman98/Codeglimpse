import { useEffect, useState } from 'react';
import CreateableReactSelect from 'react-select/creatable';
import ai_icon from '../../assets/ai.png';
import LoadingGIF from '../../assets/loading.gif';

import AceEditor from 'react-ace';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

import axios from '../../api/axios';

import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ComponentLoader from '../../components/ComponentLoader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import tags from '../../lib/data/tags';
import {
  LanguageType,
  ThemeType,
  formDataType,
  optionType,
  statusType,
} from '../../types';
import SnippetLayout from './SnippetLayout';

const Edit = () => {
  // hooks
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();

  // init data
  const initialSnippet: formDataType = {
    title: '',
    language: undefined,
    source_code: '',
    theme: 'monokai',
    visibility: undefined,
    pass_code: undefined,
    tags: [],
  };

  // states
  const [status, setStatus] = useState<statusType>({
    loading: true,
    error: null,
  });
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [themes, setThemes] = useState<ThemeType[]>([]);
  const [mode, setMode] = useState<string>('');
  const [snippet, setSnippet] = useState<formDataType>(initialSnippet);
  const [pending, setPending] = useState<boolean>(false);
  const [codeReviewPending, setCodeReviewPending] = useState<boolean>(false);
  const [options] = useState<optionType[]>([]);
  const [defaultOptions] = useState<optionType[]>([]);

  const uid = params.id;

  tags.forEach((tag: string) => {
    options.push({ value: tag, label: tag });
  });

  useEffect(() => {
    (async () => {
      try {
        const response1 = await axios.get('/data/languages');
        setLanguages(response1.data.data.languages);

        const response2 = await axios.get('/data/themes');
        setThemes(response2.data.data.themes);

        const response3 = await axiosPrivate.get(`/snippets/${uid}/edit`);
        let _snippet = response3.data.data.snippet;
        delete _snippet.uid;

        _snippet.tags.forEach((tag: string) => {
          options.push({ value: tag, label: tag });
          defaultOptions.push({ value: tag, label: tag });
        });

        setMode(_snippet.mode);
        delete _snippet.mode;
        setSnippet(_snippet);

        setStatus({
          loading: false,
          error: null,
        });
      } catch (error: any) {
        console.log(error.response);
        setStatus({
          loading: false,
          error: error.response.status,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (snippet && snippet.language !== undefined) {
      const selectedLanguage = languages.find(
        (lang) => lang.ext === snippet.language
      ) as LanguageType;
      setMode(selectedLanguage.mode);

      console.log(selectedLanguage);
    }
  }, [snippet.language]);

  const handleCodeReview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setCodeReviewPending(true);

    // console.log(snippet.source_code);
    // return;

    try {
      if (snippet.source_code === '') {
        toast.error('Source code cannot be empty');
        return;
      }

      const response = await axiosPrivate.post('/snippets/review', {
        source_code: snippet.source_code,
      });

      let message = response.data.data.message;
      // just keep the portion between ``` and ```
      message = message.split('```')[1];
      // remove the first line
      message = message.split('\n').slice(1).join('\n');
      console.log(message);
      setSnippet({
        ...snippet,
        source_code: message,
      });
      toast.success('Code review successful');
    } catch (error: any) {
      console.log(error);
      // toast.error(error.response.data.detail);
      toast.error('Something went wrong, please try again later');
    } finally {
      setCodeReviewPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPending(true);
      if (snippet.visibility === 1) {
        snippet.pass_code = undefined;
      }

      await axiosPrivate.put(`/snippets/${uid}`, snippet);
      toast.success('Snippet updated successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.detail);
    } finally {
      setPending(false);
    }
  };

  return (
    <ComponentLoader
      status={status}
      component={
        <SnippetLayout>
          <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
            <h1 className="text-2xl font-bold mb-4">Edit Snippet</h1>
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
                <label htmlFor="title" className="block mb-1 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={snippet.title}
                  onChange={(e) =>
                    setSnippet({
                      ...snippet,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter title"
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="visibility"
                  className="block mb-1 font-semibold"
                >
                  Visibility
                </label>
                <select
                  name="visibility"
                  id="visibility"
                  className="w-full px-2 py-[4.5px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
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

            {snippet.visibility === 2 && (
              <div className="mb-4">
                <label htmlFor="pass_code" className="block mb-1 font-semibold">
                  Passcode
                </label>
                <input
                  type="text"
                  name="pass_code"
                  id="pass_code"
                  minLength={6}
                  maxLength={6}
                  value={snippet.pass_code}
                  onChange={(e) =>
                    setSnippet({
                      ...snippet,
                      pass_code: e.target.value,
                    })
                  }
                  placeholder="Enter pass_code"
                  className="w-full px-2 py-[4.5px] border-2 border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
              <div className="mb-4">
                <label htmlFor="theme" className="block mb-1 font-semibold">
                  Theme
                </label>
                <select
                  name="theme"
                  id="theme"
                  className="w-full px-2 py-[4.5px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
                  value={snippet.theme}
                  required
                  onChange={(e) =>
                    setSnippet({ ...snippet, theme: e.target.value })
                  }
                >
                  <option value="">Select a theme</option>
                  <optgroup label="Light">
                    {themes &&
                      themes.map(
                        (theme: ThemeType, index: number) =>
                          !theme.is_dark && (
                            <option key={index} value={theme.value}>
                              {theme.name}
                            </option>
                          )
                      )}
                  </optgroup>
                  <optgroup label="Dark">
                    {themes &&
                      themes.map(
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
                <label htmlFor="language" className="block mb-1 font-semibold">
                  Language
                </label>
                <select
                  name="language"
                  id="language"
                  className="w-full px-2 py-[4.5px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
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
                  {languages &&
                    languages.map((lang: LanguageType, index: number) => (
                      <option
                        key={index}
                        value={lang.ext}
                        data-mode={lang.mode}
                      >
                        {lang.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mb-0">
              <label htmlFor="sourceCode" className="block mb-1 font-semibold">
                Source Code
              </label>
              <AceEditor
                className="font-fira-code"
                value={snippet.source_code}
                mode={mode}
                theme={snippet.theme}
                fontSize={18}
                width="100%"
                height="800px"
                readOnly={codeReviewPending}
                onChange={(value) =>
                  setSnippet({
                    ...snippet,
                    source_code: value,
                  })
                }
              />
            </div>

            <div className="mb-4 text-end">
              <button
                className={`px-4 py-1 text-white hover:bg-gray-600 ${
                  codeReviewPending ? 'bg-gray-700' : 'bg-black '
                }`}
                disabled={codeReviewPending}
                onClick={handleCodeReview}
              >
                {codeReviewPending ? (
                  <div className="flex items-center">
                    <img
                      src={LoadingGIF}
                      alt="Loading"
                      className="w-5 h-5 mr-2"
                    />
                    Peding code review...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img src={ai_icon} alt="AI" className="w-5 h-5 mr-2" />
                    Request code review
                  </div>
                )}
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="_tags" className="block mb-1 font-semibold">
                Tags (comma-separated)
                <span className="ml-1 font-normal text-gray-500">optional</span>
              </label>

              <CreateableReactSelect
                isMulti
                defaultValue={defaultOptions}
                options={options}
                onChange={(e) => {
                  const selectedValues = e.map((option) => option.value);
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
              disabled={pending || codeReviewPending}
            >
              {pending ? (
                <div className="flex items-center">
                  <img
                    src={LoadingGIF}
                    alt="Loading"
                    className="w-5 h-5 mr-2"
                  />
                  Updating...
                </div>
              ) : (
                'Update'
              )}
            </button>
          </form>
        </SnippetLayout>
      }
    />
  );
};

export default Edit;
