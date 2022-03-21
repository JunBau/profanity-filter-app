import { useState } from "react";
import "./ProfanityForm.css";

function ProfanityForm() {
  const [filterText, setFilterText] = useState("");
  const [action, setAction] = useState("CENSOR");
  const [message, setMessage] = useState("");
  const [replacementWord, setReplacementWord] = useState("!@%S");

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/filter/profanity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: filterText,
          action: action,
          replacementWord: replacementWord,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setMessage(resJson.filteredMessage);
      } else {
        setMessage("Error occurred: " + resJson.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mountedStyle = {
    animation: "inAnimation 650ms ease-in"
  };

  const unmountedStyle = {
    animation: "outAnimation 570ms ease-out",
    animationFillMode: "forwards"
  };

  const handleChange = (event: any) => {
    setAction(event.target.value);
  };

  const isReplacement = () => {
    return action === "REPLACE_WITH_WORD";
  };

  const hasResponse = () => {
    return message !== "";
  };

  return (
    <div className="Profranity-Form">
      <form onSubmit={handleSubmit}>
        <div className="Input-text">
          <p className="Text-description">Input Text</p>
          <input
            type="text"
            name="input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          ></input>
        </div>
        <div className="Action-dropdown">
          <p className="Dropdown-description">Action</p>
          <select value={action} onChange={handleChange}>
            <option value="CENSOR">Censor</option>
            <option value="REPLACE_WITH_WORD">Replace with word</option>
            <option value="REPLACE_WITH_FACT">Replace with fact</option>
          </select>
        </div>
        {isReplacement() && (
          <div className="Replacement-input" style={isReplacement() ? mountedStyle : unmountedStyle}>
            <p className="Replacement-description">Replacement Word</p>
            <input
              type="text"
              name="input"
              value={replacementWord}
              onChange={(e) => setReplacementWord(e.target.value)}
            ></input>
          </div>
        )}
        <div>
          <button className="Submit-button">Submit</button>
        </div>
        {hasResponse() && (
          <p className="Response-box" style={hasResponse() ? mountedStyle : unmountedStyle}>{message ? <p>{message}</p> : null}</p>
        )}
      </form>
    </div>
  );
}

export default ProfanityForm;
