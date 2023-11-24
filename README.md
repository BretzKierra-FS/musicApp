# MusicApp README

### Kierra Bretz Dec/2023 Project and Portfolio 3

## Project Overview

Welcome to MusicApp, a platform that allows you to integrate with Spotify. With MusicApp, you can log in to your Spotify account, search for your favorite songs and artists, and conveniently listen to the music directly on Spotify.

### Features and Functionality

- User authentication to access Spotify account.
- Search for songs and artists.
- Direct links to Spotify for listening to selected songs and albums.
  _More features might be added_

## Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js 18.16.1 or higher
- MongoDB running at localhost:27017
- Your preferred web browser

## Getting Started

Follow these steps to get the MusicApp up and running on your local machine:

1. Create a `.env` file in the root of the server directory.

2. Add the following content to the `.env` file:

   ```
   MONGODB_URL=mongodb://127.0.0.1:27017/SpotifyApp
   ```

3. Open the terminal and navigate to the /musicApp directory.

4. Run the following command to start the app:

   ```
   npm run dev:all
   ```

## Links

- Client-side app: http://localhost:3000
- Server-side app: http://localhost:4000
- MongoDB: http://localhost:27017
