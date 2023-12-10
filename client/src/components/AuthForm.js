import React from 'react';

const AuthForm = () => {
  const authUrl = 'http://localhost:4000/api/v1/auth'; // Replace with your actual URL

  return (
    <div
      className="w-1/2 m-auto mt-28 rounded-lg border-8 p-10 shadow-2xl bg-opacity-30 text-white"
      style={{ backgroundColor: '#191414', borderBlockColor: '#1DB954' }}
    >
      <h2 className="font-lobster mb-3 text-lg">
        Please Sign into your <span style={{ color: '#1DB954' }}>Spotify</span>{' '}
        Account
      </h2>
      <form>
        <a
          href={authUrl}
          className="bg-musicRed w-1/2 m-auto mt-2 rounded-lg p-1"
          type="button"
        >
          Sign In
        </a>
      </form>
    </div>
  );
};

export default AuthForm;
