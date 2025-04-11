import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../services/movieService';

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMovies();
  }, []);

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

  const handleSubmit = async (movie) => {
    try {
      if (editMode) {
        const updatedMovie = await updateMovie(movie);
        setMovies((prevMovies) =>
          prevMovies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
        );
      } else {
        const newMovie = await createMovie(movie);
        setMovies((prevMovies) => [...prevMovies, newMovie]);
      }
      resetForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (movie) => {
    setForm(movie);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error(error.message);
    }
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
