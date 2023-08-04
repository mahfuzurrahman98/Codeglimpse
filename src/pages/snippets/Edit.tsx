import { ChangeEvent, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CreateableReactSelect from 'react-select/creatable';

import LoadingGIF from '../../assets/loading.gif';
import languages from '../../lib/data/languages';
import themes from '../../lib/data/themes';

import AceEditor from 'react-ace';

import '../../utils/imports/ace-languages';
import '../../utils/imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import SnippetLayout from './SnippetLayout';

type Language = {
  ext: string;
  name: string;
  mode: string;
};

type formDataType = {
  title: string;
  language: string;
  source_code: string;
  font_size: number;
  theme: string;
  visibility: undefined | number;
  pass_code: undefined | string;
  _tags: string;
};

const Edit = () => {
  const [pending, setPending] = useState<boolean>(false);
  const fontSizes: number[] = [14, 16, 18, 20, 22, 24];
  const initialFormData: formDataType = {
    title: '',
    language: '',
    source_code: '',
    font_size: 18,
    theme: 'monokai',
    visibility: undefined,
    pass_code: undefined,
    _tags: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mode, setMode] = useState<string>('');

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedMode = selectedOption.getAttribute('data-mode');
    if (selectedMode) {
      setMode(selectedMode);
    }
  };

  return (
    <SnippetLayout>
      <div className="mx-auto py-7 px-5 max-w-5xl">
        <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Create a Snippet
          </h1>
          <Link
            className="px-2 py-1 text-white rounded bg-black hover:bg-gray-600"
            to="/"
          >
            Back
          </Link>
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

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1 font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter title"
                className="w-full px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="visibility" className="block mb-1 font-semibold">
                Visibility
              </label>
              <select
                name="visibility"
                id="visibility"
                className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
                value={formData.visibility}
                onChange={(e) =>
                  setFormData({
                    ...formData,
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

          {formData.visibility === 2 && (
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1 font-semibold">
                Passcode
              </label>
              <input
                type="text"
                name="pass_code"
                id="pass_code"
                value={formData.pass_code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pass_code: e.target.value,
                  })
                }
                placeholder="Enter a 6 digits passcode"
                className="w-full px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="language" className="block mb-1 font-semibold">
              Language
            </label>
            <select
              name="language"
              id="language"
              className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
              onChange={handleLanguageChange}
            >
              <option value="">Select a language</option>
              {languages.map((lang: Language, index: number) => (
                <option key={index} value={lang.ext} data-mode={lang.mode}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
            <div className="mb-4">
              <label htmlFor="font_size" className="block mb-1 font-semibold">
                Font Size
              </label>
              <select
                name="font_size"
                id="font_size"
                className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
                value={formData.font_size}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    font_size: parseInt(e.target.value),
                  })
                }
              >
                <option value="">Select a font size</option>
                {fontSizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="theme" className="block mb-1 font-semibold">
                Theme
              </label>
              <select
                name="theme"
                id="theme"
                className="w-full px-2 py-[6px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
                value={formData.theme}
                onChange={(e) =>
                  setFormData({ ...formData, theme: e.target.value })
                }
              >
                <option value="">Select a theme</option>
                <optgroup label="Light">
                  {themes.light.map((theme, index) => (
                    <option key={index} value={theme.value}>
                      {theme.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Dark">
                  {themes.dark.map((theme, index) => (
                    <option key={index} value={theme.value}>
                      {theme.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="sourceCode" className="block mb-1 font-semibold">
              Source Code
            </label>
            <AceEditor
              mode={mode}
              theme={formData.theme}
              width="100%"
              height="800px"
              fontSize={formData.font_size}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="_tags" className="block mb-1 font-semibold">
              Tags (comma-separated)
              <span className="ml-1 font-normal text-gray-500">optional</span>
            </label>
            <CreateableReactSelect
              className="border-black focus:border-black"
              isMulti
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
      </div>
    </SnippetLayout>
  );
};

export default Edit;
