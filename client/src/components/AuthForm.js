import React, { useState } from 'react';

const AuthForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button
          className="bg-musicRed w-1/2 m-auto mt-2 rounded-lg p-1
          "
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
