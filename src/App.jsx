import React from 'react';
import { MovieProvider } from './Context/Context'; 
import MovieList from './components/MovieList/MovieList'; 
import './App.css'

const App = () => {
  return (
    <MovieProvider>
      <MovieList />
    </MovieProvider>
  );
};

export default App;
