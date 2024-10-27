import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getMovies } from "../../../store/moviesSlice";
import { DatePicker } from "@mui/x-date-pickers";
import { debounce } from "lodash";
import "./style.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { Pagination } from "../components/pagination";
import Table from "../components/table";

const defaultFilter = {
  date: null,
  type: null,
  page: 1,
  search: "Pokemon",
};

const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies: data, totalResults } = useAppSelector(
    (state) => state.moviesSlice
  );

  const [movieType, setMovieType] = useState("");
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const itemsPerPage = 10;

  const filters = useMemo(
    () => ({
      date: selectedYear ? selectedYear.year() : null,
      type: movieType || null,
      page: currentPage,
      search:
        debouncedSearch.length > 2 ? debouncedSearch : defaultFilter.search,
    }),
    [selectedYear, movieType, currentPage, debouncedSearch]
  );

  const handleSelectMovieType = (e: SelectChangeEvent) => {
    setMovieType(e.target.value as string);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedYear(newValue);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearFilter = () => {
    setMovieType("");
    setSelectedYear(null);
    setSearch("");
    setCurrentPage(1);
  };

  const debouncedUpdateSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedUpdateSearch(search);
  }, [search, debouncedUpdateSearch]);

  useEffect(() => {
    dispatch(getMovies(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [movieType, selectedYear, debouncedSearch]);

  const isFilteringApplied = <T extends Record<string, any>>(
    obj1: T,
    obj2: T
  ): boolean => Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

  return (
    <div className="layout-container">
      <div className="filter">
        <TextField
          label="Search"
          variant="outlined"
          className="search"
          value={search}
          onChange={handleSearch}
          placeholder="Type at least 3 letters"
          fullWidth
        />
        <DatePicker
          label="Year"
          views={["year"]}
          value={selectedYear}
          className="year"
          onChange={handleDateChange}
        />
        <FormControl className="selection" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={movieType}
            label="Type"
            onChange={handleSelectMovieType}
          >
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="game">Games</MenuItem>
          </Select>
        </FormControl>

        {!isFilteringApplied(filters, defaultFilter) ? (
          <Button onClick={handleClearFilter} variant="outlined">
            Clear
          </Button>
        ) : null}
      </div>
      <Table data={data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(Number(totalResults) / itemsPerPage)}
      />
    </div>
  );
};

export default Movies;
