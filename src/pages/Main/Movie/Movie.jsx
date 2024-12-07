import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Movie.css';
import { Outlet } from 'react-router-dom';
import axios from 'axios';


const Movie = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const imageBaseUrl = "https://image.tmdb.org/t/p/original"; 
  const [localMovies, setLocalMovies] = useState([]);
  const [movieImages, setMovieImages] = useState({});


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost/movieproject-api/movies');
        const data = await response.json();
        setLocalMovies(data);
        
        const featured = data.find(movie => movie.isFeatured);
        if (featured) {
          setFeaturedMovie({
            title: featured.title,
            overview: featured.overview,
            release_date: featured.releaseDate,
            vote_average: featured.voteAverage,
            poster_path: featured.posterPath,
          });
        }
        
        data.forEach(movie => {
          if (movie.tmdbId) {
            fetchMovieImages(movie.tmdbId);
          }
        });
      } catch (error) {
        console.error('Error fetching local movies:', error);
      }
    };

    const fetchMovieImages = async (tmdbId) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images`, options);
        const data = await response.json();
        setMovieImages(prev => ({
          ...prev,
          [tmdbId]: data
        }));
      } catch (err) {
        console.error(`Error fetching images for movie ${tmdbId}:`, err);
      }
    };

    fetchMovies();
  }, []);

  console.log(apiKey); 

  useEffect(() => {
    setFavoriteMovies([
      { id: 1, title: "The Dark Knight", poster_path: "https://image.tmdb.org/t/p/original/cz8MjCVSPOq7SKtTRp1APeO6zWh.jpg" },
      { id: 2, title: "The Matrix", poster_path: "https://image.tmdb.org/t/p/original/qxHcqkbjvjaD4rTp0Y1ZZCwIj6i.jpg" },
    ]);
  }, []);

  const handleEditClick = () => {
    navigate(`/main/movies/form/${featuredMovie.title}`);
  };

  return (
    <div className="movie-layout">
      <div className="left-side">
        <div className="first-row">
          <div className="featured-movie-card">
            {featuredMovie ? (
              <div className="featured-movie-info">
                <img
                  src={featuredMovie.poster_path}
                  alt={featuredMovie.title}
                  className="featured-movie-poster"
                  style={{ maxWidth: '200px' }}
                />
                <div className="movie-details">
                  <h2>{featuredMovie.title}</h2>
                  <p><strong>Release Date:</strong> {featuredMovie.release_date}</p>
                  <p><strong>Rating:</strong> {featuredMovie.vote_average}</p>
                  <div className="overview-container">
                    <p><strong>Overview:</strong> {featuredMovie.overview}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No featured movie available</p>
            )}
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>

          <div className="search-movies-card">
            <h3>Search Movies</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
            />
            <button>Search</button>
          </div>
        </div>

        <div className="second-row">
          <div className="movie-list-card">
            <h3>Movie List</h3>
            <div className="movie-grid">
              {localMovies.map(movie => (
                <div key={movie.id} className="movie-item">
                  {movieImages[movie.tmdbId]?.posters?.length > 0 && (
                    <img 
                      src={`${imageBaseUrl}${movieImages[movie.tmdbId].posters[0].file_path}`}
                      alt={movie.title}
                      className="movie-poster"
                      style={{ maxWidth: '150px' }}
                    />
                  )}
                  <h4>{movie.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="favorites-container">
            <h3>Favorite Movies</h3>
            {favoriteMovies.length > 0 ? (
              <ul>
                {favoriteMovies.map((movie) => (
                  <li key={movie.id}>
                    <img
                      src={`${imageBaseUrl}${movie.poster_path}`}
                      alt={movie.title}
                      className="favorite-movie-poster"
                    />
                    <p>{movie.title}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorites yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
