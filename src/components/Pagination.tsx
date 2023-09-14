import { Link } from 'react-router-dom';

export const Pagination = ({
  totalSnippets,
  searchParams,
}: {
  totalSnippets: number;
  searchParams: URLSearchParams;
}) => {
  const links = [];
  const _limit = 1;

  for (let i = 1; i <= Math.ceil(totalSnippets / _limit); i++) {
    links.push(
      i !== Number(searchParams.get('page')) ? (
        <Link
          key={i} // Add a unique key to each Link component
          to={`?q=${
            searchParams.get('q') ? searchParams.get('q') : ''
          }&page=${i}&limit=${_limit}`}
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-700"
        >
          {i}
        </Link>
      ) : (
        <button
          key={i} // Add a unique key to each button component
          className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-700"
          disabled={true}
        >
          {i}
        </button>
      )
    );
  }

  return (
    <div className="flex gap-x-2">
      {Number(searchParams.get('page')) > 1 && (
        <Link
          to={`?q=${searchParams.get('q') ? searchParams.get('q') : ''}&page=${
            Number(searchParams.get('page') || 1) - 1
          }&limit=${_limit}`}
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-700"
        >
          Prev
        </Link>
      )}
      {links}
      {Number(searchParams.get('page')) < Math.ceil(totalSnippets / _limit) && (
        <Link
          to={`?q=${searchParams.get('q') ? searchParams.get('q') : ''}&page=${
            Number(searchParams.get('page') || 1) + 1
          }&limit=${_limit}`}
          className="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-700"
        >
          Next
        </Link>
      )}
    </div>
  );
};
