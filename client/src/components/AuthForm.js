import React, { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div
      className="w-1/2 m-auto mt-28 rounded-lg border-8 p-10 shadow-2xl bg-opacity-30 text-white"
      style={{ backgroundColor: '#191414', borderBlockColor: '#1DB954' }}
    >
      <h2 className=" font-lobster mb-3 text-lg">
        Please Sign into your<span style={{ color: '#1DB954' }}> Spotify </span>
        Account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <label className="flex mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="p-1, mb-2 w-full"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="flex mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="p-1, mb-2 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-musicRed w-1/2 m-auto mt-2 rounded-lg"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
