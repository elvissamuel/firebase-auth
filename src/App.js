import { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';

function App() {
  const [movietitle, setMovieTitle] = useState()
  const [movieCat, setMovieCat] = useState()
  const [movieYear, setMovieYear] = useState()
  const [noDownload, setNoDownload] = useState()


  return (
    <div className="App">
      <Auth />

    </div>
  );
}

export default App;
