import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import MusicListing from './components/MusicListing.js';
import Footer from './components/Footer.js';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newAccessToken = urlParams.get('access_token');

    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }
  }, [location.search]);

  return (
    <div className="">
      <Header />
      {!accessToken && <AuthForm />}
      {accessToken && <MusicListing accessToken={accessToken} />}
      <Footer />
    </div>
  );
}

export default App;
