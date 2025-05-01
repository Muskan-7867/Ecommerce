import { useQueryState } from "nuqs";

interface PaginationProps {
  totalProducts: number;
  productPerPage: number;
}
const Pagination: React.FC<PaginationProps> = ({totalProducts, productPerPage}) => {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const currentPage = Number(page);
  const totalPages = Math.ceil(totalProducts / productPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage((currentPage + 1).toString());
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage((currentPage - 1).toString());
    }
  };
  
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex gap-2 px-4 py-2 rounded-md items-center overflow-x-auto">
        <button onClick={handlePrevious} disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md shrink-0 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600"
              : "bg-primary text-white"
          }`}
        >
          Prev
        </button>

        {pages.map((pageNumber) => {
          const isCurrent = currentPage === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber.toString())}
              className={`px-4 py-2 rounded-md shrink-0 ${
                isCurrent
                  ? "bg-white text-primary shadow-xl"
                  : "bg-primary text-white"
              } 
              ${ 
                pageNumber !== 1 &&
                pageNumber !== totalPages &&
                pageNumber !== currentPage &&
                pageNumber !== currentPage - 1 &&
                pageNumber !== currentPage + 1
                  ? "hidden sm:inline-block"
                  : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md shrink-0 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600"
              : "bg-primary text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
