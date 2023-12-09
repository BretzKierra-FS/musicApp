import { useEffect, useState } from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import MusicListing from './components/MusicListing.js';
import Footer from './components/Footer.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = false;
    if (user) {
      setUser(user);
    }
  });

  return (
    <div className="">
      <Header />
      {!user && <AuthForm />}
      {user && <MusicListing />}
      <Footer />
    </div>
  );
}

export default App;
