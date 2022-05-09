import './App.css';
import Memes from './data.js';
import React, { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MemeImage from './meme.png'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Header = ({ isDarkMode }) => {
  const style = {
    color: isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#1c1c1c' : 'whitesmoke'
  }

  return (<div>
    <header className='header' style={style}>
      <div className='header_left'>
        <img src={MemeImage} alt='meme_logo' />
        <h1> Meme Generator </h1>
      </div>
      <div className='header_right'>
        <p>By Shivam Arora</p>
      </div>
    </header>
  </div>
  );
}

const Meme = ({ isDarkMode }) => {
  const [selectedMeme, setSelectedMeme] = useState({ 'url': Memes.data.memes[0].url, 'topText': '', 'bottomText': '' });
  const [allMemeImages, setAllMemeImages] = useState(Memes.data.memes);

  const getImage = (e) => {
    e.preventDefault();
    const randomMemeUrl = allMemeImages[Math.floor(Math.random() * allMemeImages.length)].url;
    setSelectedMeme((prevState) => ({
      ...prevState,
      url: randomMemeUrl
    }));
  }

  const style = {
    color: isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#1c1c1c' : 'whitesmoke'
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMeme((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className='main_container'>
      <form className='meme_form'>
        <div className='form_container'>
          <input type='text' placeholder='Top' value={selectedMeme.topText} onChange={handleChange} name="topText" />
          <input type='text' placeholder='Bottom' value={selectedMeme.bottomText} onChange={handleChange} name="bottomText" />
        </div>
        <button type='submit' style={style} onClick={(e) => getImage(e)}> <p className='button_text'>Get a new meme image  <NavigateNextIcon /> </p></button>
      </form>
      <div className='meme'>
        <img src={selectedMeme.url} alt='' className='meme--image' />
        <h2 className='meme--text top'> {selectedMeme.topText} </h2>
        <h2 className='meme--text bottom'> {selectedMeme.bottomText}</h2>
      </div>
    </div>
  );

}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const style = {
    color: isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#1c1c1c' : 'whitesmoke'
  }

  return (
    <div className="app">
      <Header isDarkMode={isDarkMode} />
      <Meme isDarkMode={isDarkMode} />
      <a className="float" style={style} onClick={() => toggleMode()}>
        {!isDarkMode && <DarkModeIcon className='float_icon' />}
        {isDarkMode && <LightModeIcon className='float_icon' />}
      </a>
    </div >
  );
}

export default App;
