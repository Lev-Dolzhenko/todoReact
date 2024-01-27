import { useState, useEffect } from "react";
import modeIcon from './../../content/Theme/darkMode.svg';
import "./ButtonTheme.css";

function ButtonTheme() {
  const [darkMode, setDarkMode] = useState("dark");

    useEffect(() => {
        if (darkMode === 'light') {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(() => {
        return darkMode === "dark" ? "light" : "dark"
    })
  }
  return (
    <button onClick={toggleDarkMode} className="buttonTheme">
      <img src={modeIcon} alt="" />
    </button>
  );
}

export default ButtonTheme;
