import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ProfanityForm from "./components/forms/ProfanityForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="Title-text">Profanity Filter</p>
        <ProfanityForm />
      </header>
    </div>
  );
}

export default App;
