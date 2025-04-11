import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: '',
    productionYear: '',
    director: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (form.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }
    if (form.director.length < 10) {
      newErrors.director = 'Director must be at least 10 characters long';
    }
    if (form.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (newMovie) => {
    if (editMode) {
      const updatedMovies = movies.map((movie) =>
        movie.id === newMovie.id ? newMovie : movie
      );
      setMovies(updatedMovies);
    } else {
      const newMovieWithId = { ...newMovie, id: Date.now() }; 
      setMovies([...movies, newMovieWithId]);
    }
  };

  const handleEdit = (movie) => {
    setForm(movie);
    setEditMode(true);
  };

  const handleDelete = (movieId) => {
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
  };

  const resetForm = () => {
    setForm({
      title: '',
      productionYear: '',
      director: '',
      description: '',
    });
    setErrors({});
    setEditMode(false);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        form,
        setForm,
        editMode,
        errors,
        handleSubmit,
        handleEdit,
        handleDelete,
        resetForm,
        validateForm,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
