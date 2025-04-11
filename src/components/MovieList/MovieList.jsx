import React, { useState } from 'react';
import { useMovieContext } from '../../Context/Context'
import styles from './MovieList.module.css';
import Search from '../Search/Search';

const MovieList = () => {
  const { movies,handleSubmit, handleEdit,handleDelete, form, setForm, editMode, resetForm, errors, validateForm } = useMovieContext();

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    handleSubmit(form);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1>🎬 Movie Library</h1>

      <Search setMovie={setSearchTerm} />

      <form onSubmit={onSubmit} className={styles.form}>
        <h2>{editMode ? '✏️ Update Movie' : '➕ Add New Movie'}</h2>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
        
        <input name="productionYear" placeholder="Production Year" value={form.productionYear} onChange={handleChange} type="number" required/>
        
        <input name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
        {errors.director && <p className={styles.error}>{errors.director}</p>}

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        {errors.description && <p className={styles.error}>{errors.description}</p>}

        <button type="submit">{editMode ? 'Update' : 'Save Movie'}</button>
        {editMode && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h2>📄 Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies yet...</p>
      ) : (
        movies
          .filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((movie) => (
            <div key={movie.id} className={styles.movieItem}> 
              <strong>{movie.title}</strong> ({movie.productionYear})<br />
              <em>Director: {movie.director}</em>
              <p>{movie.description}</p>
              <div className={styles.movieActions}>
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default MovieList;
