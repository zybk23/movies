import "./style.scss";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range = [];
    const delta = 1;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    if (left > 2) {
      range.push(1, "...");
    } else {
      range.push(1);
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push("...", totalPages);
    } else {
      range.push(totalPages);
    }

    return totalPages ? (totalPages === 1 ? [1] : range) : [1];
  };

  return (
    <div className="pagination-area">
      <div className="pagination-container">
        <div
          className={`prev-button-container ${
            currentPage === 1 ? "disable" : ""
          }`}
          onClick={handleClickPrevButton}
        >
          <img
            src={require("../../../../assets/images/left-arrow.png")}
            className={`prev-icon ${currentPage === 1 ? "disable" : ""}`}
            alt=""
          />
          <span className={`${currentPage === 1 ? "disable" : ""} prev-text`}>
            Prev
          </span>
        </div>

        {getPaginationRange().map((item, index) => (
          <div
            key={index}
            className={`page-number ${currentPage !== item ? "disable" : ""}`}
            onClick={() =>
              typeof item === "number" && handleClickPageNumber(item)
            }
          >
            {item}
          </div>
        ))}
        <div
          className={`next-button-container ${
            currentPage === totalPages ? "disable" : ""
          }`}
          onClick={handleClickNextButton}
        >
          <span
            className={`${
              currentPage === totalPages ? "disable" : ""
            } next-text`}
          >
            Next
          </span>
          <img
            src={require("../../../../assets/images/right-arrow.png")}
            className={`prev-icon ${currentPage === 1 ? "disable" : ""}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
