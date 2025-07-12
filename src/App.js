import React, { useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;


function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
      alert('No movies found.');
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>📅 {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;