import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css';
import Pagination from '../../Components/Pagination';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);  
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        const movieData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(movieData);
      })
      .catch((error) => {
        console.error(error);
        alert('Error! Failed to load movie details.');
      });
    }
  }, [movieId]);

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: 'application/json',
        Authorization: 
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzBkMDFhODljNzMyMDk4ZDYzZjQ2YTQzYWQ5OTE2NCIsIm5iZiI6MTczMzQxMDIwMC44NDgsInN1YiI6IjY3NTFiZDk4ODAyYmFkMTYwOTFhOGIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0BE3YmIIEl8N_L_zjJAsoKj9cpleZLybaFda3n7rak',
      },
    })
    .then((response) => {
      setSearchedMovieList(response.data.results);
      setTotalResults(response.data.total_results);
      setTotalPages(Math.ceil(response.data.total_results / rowsPerPage)); 
    })
    .catch((error) => {
      console.error(error);
      alert('Error! Failed to get movies.');
    });
  }, [query, currentPage, rowsPerPage]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    axios({
      method: movieId ? 'patch' : 'post',
      url: movieId ? `/movies/${movieId}` : '/movies',
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((saveResponse) => {
      alert('Movie saved successfully!');
      navigate('/main/movies');
    })
    .catch((error) => {
      alert('Error! Failed to save movie.');
      console.error(error);
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setTotalPages(Math.ceil(totalResults / newRowsPerPage)); 
    setCurrentPage(1); 
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [currentPage, rowsPerPage]);

  return (
    <>
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>

      {!movieId && (
        <>
          <div className='search-container'>
            <label>Search Movie:</label>
            <input type='text' onChange={(event) => setQuery(event.target.value)} />
            <button type='button' onClick={handleSearch}>Search</button>
            <div className='searched-movie' style={{ maxHeight: '300px', overflowY: 'scroll' }}>
              {searchedMovieList.slice(0, rowsPerPage).map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              handlePreviousPage={handlePreviousPage} 
              handleNextPage={handleNextPage} 
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
          <hr />
        </>
      )}

      {selectedMovie && (
        <div className='container'>
          <form>
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={`${selectedMovie.original_title} poster`}
            />
            <div className='field'>
              <label>Title:</label>
              <input
                type='text'
                value={selectedMovie.original_title}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, original_title: e.target.value, title: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Overview:</label>
              <textarea
                rows={10}
                value={selectedMovie.overview}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, overview: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Popularity:</label>
              <input
                type='text'
                value={selectedMovie.popularity}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, popularity: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Release Date:</label>
              <input
                type='text'
                value={selectedMovie.release_date}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, release_date: e.target.value })}
              />
            </div>
            <div className='field'>
              <label>Vote Average:</label>
              <input
                type='text'
                value={selectedMovie.vote_average}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, vote_average: e.target.value })}
              />
            </div>
            <button type='button' onClick={handleSave}>Save</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;