import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import { getMovieByIMDbId } from "../../../store/moviesSlice";
import "./style.scss";
import { IMovieDetails } from "../../../utils/types";

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const movieDetails: IMovieDetails = useAppSelector(
    (state) => state.moviesSlice.movieDetails
  );

  useEffect(() => {
    dispatch(getMovieByIMDbId(id as string));
  }, [dispatch, id]);

  return (
    <div className="detail-screen">
      <div className="detail-container">
        <div className="detail">
          <img src={movieDetails?.Poster} alt="" />
          <div className="detail-info">
            <span className="text">
              Name: <span>{movieDetails?.Title}</span>
            </span>
            <span className="text">
              Director: <span>{movieDetails?.Director}</span>
            </span>
            <span className="text">
              Actors: <span>{movieDetails?.Actors}</span>
            </span>
            <span className="text">
              Genre: <span>{movieDetails?.Genre}</span>
            </span>
            <span className="text">
              Writer: <span>{movieDetails?.Writer}</span>
            </span>
            <span className="text">
              Language and Runtime:{" "}
              <span>
                {movieDetails?.Language} {movieDetails?.Runtime}
              </span>
            </span>
            <span className="text">
              Release Year: <span>{movieDetails?.Year}</span>
            </span>
            <span className="text">
              Type: <span>{movieDetails?.Type}</span>
            </span>
            <span className="text">
              Plot: <span>{movieDetails?.Plot}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
