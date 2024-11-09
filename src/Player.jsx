import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

const Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const volumeRef = useRef(null);
  const [bigImage, setBigImage] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const updateDuration = () => {
      setDuration(audioRef.current.duration);
    };

    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("loadedmetadata", updateDuration);
    audioRef.current.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [currentSongIndex]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSongHandler = () => {
    console.time("Next song load time"); // Inicia el temporizador
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(true); // También aquí para reproducir automáticamente la canción anterior
  };

  const volumeChangeHandler = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    localStorage.setItem("volume", newVolume);
  };

  const timeChangeHandler = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (sliderRef.current) {
      const progress = (currentTime / duration) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #1db954 ${progress}%, #535353 ${progress}%)`;
    }
    if (volumeRef.current) {
      const volumeProgress = volume * 100;
      volumeRef.current.style.background = `linear-gradient(to right, #1db954 ${volumeProgress}%, #535353 ${volumeProgress}%)`;
    }
  }, [currentTime, duration, volume]);

  // Reproduce automáticamente la canción si `isPlaying` es true y cambia el índice de la canción
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().then(() => {
        console.timeEnd("Next song load time"); // Termina y muestra el tiempo
      });
    }
  }, [currentSongIndex, isPlaying]);

  return (
    <div className="player">
      <audio ref={audioRef} src={currentSong.mp3Url} preload="auto" />
      {bigImage && (
        <img
          src={currentSong.coverUrl}
          alt={`${currentSong.title} cover`}
          className="player__cover2"
        />
      )}

      <div className="player__details">
        {!bigImage && (
          <div>
            <img
              src={currentSong.coverUrl}
              alt={`${currentSong.title} cover`}
              className="player__cover"
            />
            <button onClick={() => setBigImage(!bigImage)}>
              <img src="/img/expand.svg" alt="Expand" />
            </button>
          </div>
        )}
        <div className="player__info">
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="center-controls">
        <div className="player__controls">
          <button onClick={prevSongHandler}>
            <img src="/img/back.svg" alt="Back" />
          </button>
          <button onClick={playPauseHandler}>
            <div>
              <img
                src={isPlaying ? "/img/pause.svg" : "/img/play.svg"}
                alt="Play"
              />
            </div>
          </button>
          <button onClick={nextSongHandler}>
            <img src="/img/next.svg" alt="Next" />
          </button>
        </div>

        <div className="player__time">
          <span>{formatTime(currentTime)}</span>
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={timeChangeHandler}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player__volume">
        <img src="/img/volume.svg" alt="Volume" />
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          ref={volumeRef}
          value={volume}
          onChange={volumeChangeHandler}
        />
      </div>
    </div>
  );
};

// Define PropTypes for Player component
Player.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      mp3Url: PropTypes.string.isRequired,
      coverUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Player;
