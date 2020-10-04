import React, { useEffect, useState } from "react";
import "./styles.css";
import keys from "./keys";

const DrumKey = ({ drumKey, playAudio }) => {
  return (
    <div
      id={`drum-pad-${drumKey.key}`}
      className="drum-pad"
      onClick={() => playAudio(drumKey.key)}
    >
      {drumKey.key}
      <audio id={drumKey.key} className="clip" src={drumKey.url} />
    </div>
  );
};

const isValidKey = (key) => {
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].key === key) {
      return true;
    }
  }
  return false;
};

export default function App() {
  const [message, setMessage] = useState("");
  const playAudio = (key) => {
    if (isValidKey(key)) {
      document.getElementById(key).play();
      setMessage(keys.find((k) => k.key === key).display);
    }
  };
  useEffect(() => {
    const handleKeypress = (event) => {
      playAudio(event.key.toUpperCase());
    };
    document.addEventListener("keydown", handleKeypress);
  }, []);
  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <div id="drum-machine">
        <div id="display">{message}</div>
        <div id="keys">
          {keys.map((key) => {
            return (
              <DrumKey key={key.key} drumKey={key} playAudio={playAudio} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
