import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';  // Changed the CSS import to Search.css for clarity
import { Outlet } from 'react-router-dom';

const Search = () => {  // Changed from Favorites to Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Simulate a search API request for movies (you can replace this with real API logic)
  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulating search results based on query (replace with actual API call)
      setSearchResults([
        { id: 1, title: "The Dark Knight", poster_path: "https://image.tmdb.org/t/p/original/cz8MjCVSPOq7SKtTRp1APeO6zWh.jpg" },
        { id: 2, title: "The Matrix", poster_path: "https://image.tmdb.org/t/p/original/qxHcqkbjvjaD4rTp0Y1ZZCwIj6i.jpg" },
      ]);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleEditClick = (movieTitle) => {
    navigate(`/main/movies/form/${movieTitle}`);
  };

  return (
    <div className="search-layout">
      <div className="left-side">
        <div className="search-card">
          <h3>Search Movies</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button onClick={() => { /* Trigger search logic, if needed */ }}>Search</button>
        </div>
        
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((movie) => (
                <li key={movie.id}>
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <p>{movie.title}</p>
                  <button onClick={() => handleEditClick(movie.title)}>Edit</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies found. Try a different search.</p>
          )}
        </div>
      </div>
      
      <div className="right-side">
        <div className="additional-info">
          <h3>Additional Info</h3>
          <p>Placeholder for extra content or recommendations.</p>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Search;
