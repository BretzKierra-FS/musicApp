import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import MusicListing from './components/MusicListing.js';
import Footer from './components/Footer.js';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="">
      <Header />
      {!token && <AuthForm onLogin={handleLogin} />}
      {token && <MusicListing />}
      <Footer />
    </div>
  );
}

export default App;
