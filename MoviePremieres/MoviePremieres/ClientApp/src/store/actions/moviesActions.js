import moment from 'moment';
import {
  getMoviesRequest,
  getMoviesSuccess,
  getMovieRequest,
  getMovieSuccess,
  addNewMovieRequest,
  addNewMovieSuccess,
  updateMovieRequest,
  updateMovieSuccess,
} from '../constants/moviesConstants';

// eslint-disable-next-line import/prefer-default-export
export const moviesActions = {
  requestMovies: () => async (dispatch) => {
    dispatch({ type: getMoviesRequest });

    const url = 'api/movies';
    const response = await fetch(url);
    const movies = await response.json();

    dispatch({ type: getMoviesSuccess, movies });
  },

  requestMovie: ({ id, callback }) => async (dispatch) => {
    dispatch({ type: getMovieRequest });

    const url = `api/movies/${id}`;
    const response = await fetch(url);
    const movie = await response.json();
    const premiereDate = moment(movie.premiereDate);

    const movieData = { ...movie, premiereDate };
    callback(movieData);

    dispatch({ type: getMovieSuccess, movie: movieData });
  },

  addNewMovie: movie => async (dispatch) => {
    dispatch({ type: addNewMovieRequest });

    const url = 'api/movies';
    const response = await fetch(url,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(movie),
      });

    if (response.status === 200) {
      dispatch({ type: addNewMovieSuccess });
    }
  },

  updateMovie: movie => async (dispatch) => {
    dispatch({ type: updateMovieRequest });

    const url = 'api/movies';
    const response = await fetch(url,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(movie),
      });

    if (response.status === 200) {
      dispatch({ type: updateMovieSuccess });
    }
  },
};
