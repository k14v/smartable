import { FC } from "react";

interface Props {
  currentPage: number;
  setPage: (page: number) => void;
  pages: number;
}

const TablePagination: FC<Props> = ({ currentPage, setPage, pages }) => {
  return (
    <div>
      {typeof currentPage === "number" && (
        <div className="flex w-full h-12 bg-m-light dark:bg-darker justify-around">
          <button
            className="disabled:opacity-50"
            onClick={() => setPage(0)}
            disabled={currentPage === 0}
          >
            First Page
          </button>
          <button
            className="disabled:opacity-50"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="flex justify-center items-center">
            {currentPage}/{pages}
          </span>
          <button
            className="disabled:opacity-50"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === pages}
          >
            Next
          </button>
          <button
            className="disabled:opacity-50"
            onClick={() => setPage(pages)}
            disabled={currentPage === pages}
          >
            Last Page
          </button>
        </div>
      )}
    </div>
  );
};

export default TablePagination;
