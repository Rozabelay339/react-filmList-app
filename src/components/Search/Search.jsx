import { useRef } from 'react';
import styles from './Search.module.css';

const Search = ({ setMovie }) => {
    const textVal = useRef();
  
    const handleOnChange = () => {
      setMovie(textVal.current.value);
    };
  
    return (
      <div className={styles.search}>
        <input type="text" ref={textVal} placeholder="Search movies" />
        <button onClick={handleOnChange}>Search</button>
      </div>
    );
};

export default Search;
