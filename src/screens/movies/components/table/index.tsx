import { useMemo } from "react";
import { useTable, Column } from "react-table";
import "./style.scss";
import { useAppDispatch } from "../../../../store/hooks";
import { getMovieByIMDbId } from "../../../../store/moviesSlice";
import { useNavigate } from "react-router-dom";

interface IData {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

const Table = ({ data }: { data: IData[] }) => {
  const columns: Column<IData>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Title",
      },
      {
        Header: "Release Date",
        accessor: "Year",
      },
      {
        Header: "Type",
        accessor: "Type",
      },
      {
        Header: "IMDb ID",
        accessor: "imdbID",
      },
    ],
    []
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleOpenSelectedMovieDetails = (id: string) => {
    dispatch(getMovieByIMDbId(id))
      .then((res) => {
        if (res.payload) {
          navigate(`/details/${id}`);
        } else {
          alert("There are no details available for the selected movie");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              onClick={() =>
                handleOpenSelectedMovieDetails(row?.values?.imdbID)
              }
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
