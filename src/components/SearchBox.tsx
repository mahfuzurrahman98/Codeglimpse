import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/magnifying-glass.svg';

const SearchBox = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams();
  const [param, setParam] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = param.trim() || '';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    navigate(`/?q=${q}&page=${page}&limit=${limit}`, { replace: true });
  };

  return (
    <form className="items-center w-full relative" onSubmit={handleSearch}>
      <input
        className="border-2 rounded-2xl border-black pl-4 py-1 pr-10 w-full"
        placeholder="Search snippets by title, or tags"
        value={param}
        onChange={(e) => setParam(e.target.value)}
      />
      <img
        src={SearchIcon}
        className="w-5 absolute top-0 right-0 mt-2 mr-3 pointer-events-none cursor-pointer"
      />
    </form>
  );
};

export default SearchBox;