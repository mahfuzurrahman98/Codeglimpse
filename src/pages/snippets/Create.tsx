import { useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import LoadingGIF from '../../assets/loading.gif';
import languages from '../../lib/data/languages';
import themes from '../../lib/data/themes';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';

import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/theme-gob';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-merbivore_soft';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-xcode';

import 'ace-builds/src-noconflict/ext-language_tools';

const Create = () => {
  const pending = useRef(false);
  const fontSizes = [14, 16, 18, 20, 22, 24];

  const [formData, setFormData] = useState({
    title: '',
    language: 'cpp',
    font_size: 18,
    theme: 'monokai',
    sourceCode: '',
    _tags: '',
  });

  return (
    <div className="mx-auto py-7 px-5 max-w-3xl">
      <div className="flex justify-between items-start mb-5 border-b-4 border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Create a Snippet
        </h1>
        <Link
          className="px-3 py-1 text-white rounded bg-black hover:bg-gray-600"
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
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Enter title"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block mb-1 font-semibold">
            Language
          </label>
          <select
            name="language"
            id="language"
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
          >
            <option value="">Select a language</option>
            {languages.map((lang, index) => (
              <option key={index} value={lang.ext}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="font_size" className="block mb-1 font-semibold">
            Font Size
          </label>
          <select
            name="font_size"
            id="font_size"
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
            value={formData.font_size}
            onChange={(e) =>
              setFormData({ ...formData, font_size: parseInt(e.target.value) })
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
            className="w-full px-3 py-[10px] border-2 bg-white border-gray-300 rounded focus:outline-none focus:border-black"
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

        <div className="mb-4">
          <label htmlFor="sourceCode" className="block mb-1 font-semibold">
            Source Code
          </label>
          <AceEditor
            mode="javascript"
            theme={formData.theme}
            width="100%"
            fontSize={formData.font_size}
            // onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="_tags" className="block mb-1 font-semibold">
            Tags (comma-separated)
            <span className="ml-1 font-normal text-gray-500">optional</span>
          </label>
          <input
            type="text"
            name="_tags"
            placeholder="ex: javascript, react, nodejs"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded hover:bg-gray-600 ${
            pending ? 'bg-gray-700' : 'bg-black '
          }`}
          disabled={pending.current}
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
  );
};

export default Create;
