import React from 'react';
import './App.css'
import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function App() {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [caselle, setCaselle] = React.useState<{ url: string, email: string, phone: string }[]>([]);

  const inviaMessaggio = (): void => {
    const post = {
        title: name,
        surname: surname,
        caselle: caselle
    }
    window.Telegram.WebApp.sendData(JSON.stringify(post));
  };

  const aggiungiCasella = () => {
    setCaselle([...caselle, { url: '', email: '', phone: '' }]);
  };

  const rimuoviCasella = () => {
    setCaselle(caselle.slice(0, -1));
  };

  const handleCasellaChange = (index: number, field: 'url' | 'email' | 'phone', value: string) => {
    const newCaselle = caselle.map((casella, i) => 
      i === index ? { ...casella, [field]: value } : casella
    );
    setCaselle(newCaselle);
  };

  return (
    <>
      <div className="container">
      {/* Casella di input per il titolo */}
      <input
        type="text"
        placeholder="write here your name"
        className="input-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Casella di input per la descrizione */}
      <textarea
        placeholder="Write here your surname"
        className="input-surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      {/* Aggiungi o rimuovi caselle */}
      <fieldset id="bottoniContainer">
        <legend>Add or remove boxes:</legend>
        <button type="button" onClick={aggiungiCasella}>+</button>
        <button type="button" onClick={rimuoviCasella}>-</button>
      </fieldset>     

      {caselle.map((casella, index) => (
        <div key={index} className="casella">
          <input
            type="text"
            placeholder={`URL ${index + 1}`}
            value={casella.url}
            onChange={(e) => handleCasellaChange(index, 'url', e.target.value)}
            className="input-casella"
          />
          <input
            type="text"
            placeholder={`Email ${index + 1}`}
            value={casella.email}
            onChange={(e) => handleCasellaChange(index, 'email', e.target.value)}
            className="input-casella"
          />
          <input
            type="text"
            placeholder={`Phone ${index + 1}`}
            value={casella.phone}
            onChange={(e) => handleCasellaChange(index, 'phone', e.target.value)}
            className="input-casella"
          />
        </div>
      ))}
      {/* Bottone di invio post */}
      <button className="button" onClick={inviaMessaggio}>Confirm</button>
    </div>
    </>
  )
}

export default App