import { useEffect, useState } from 'react';
import { mockAlbums, mockSongs, mockArtists } from '../mock/mockData';
import placeholder from '../images/placeholder.png';

function MusicListing() {
  const [tracks, setTracks] = useState(mockSongs);
  const [albums, setAlbums] = useState(mockAlbums);
  const [artists, setArtists] = useState(mockArtists);

  // mock search logic
  const handleSearch = (keyword) => {
    //Search logic will go here
  };

  return (
    <div className="w-3/4 m-auto mt-20">
      {/* Search form to search keywords */}
      <div id="searchListing" className="w-3/4 m-auto mt-20">
        <input
          className="mb-10"
          type="text"
          placeholder="Search..."
          onChange={(e) => console.log(e.target.value)}
        />
        <button
          className=" text-white ml-1 bg-musicViolet pl-1 pr-1"
          onClick={handleSearch}
        >
          Search
        </button>

        {/* Display Songs */}
        <h3>Songs</h3>
        <div className="flex gap-6 text-white">
          {tracks.map((song) => (
            <div key={song.id}>
              {/* <img src={song.image} alt={placeholder} />    Remember to replace*/}
              <img
                className=" rounded-md"
                src={placeholder}
                alt={placeholder}
                onClick={() => (window.location.href = song.link)}
              />
              <p>{song.title}</p>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>

        {/* Display Artists */}
        <h3 className="mt-3">Artists</h3>
        <div className="flex gap-6 text-white">
          {artists.map((artist) => (
            <div key={artist.id}>
              {/* <img src={artist.image} alt={placeholder} />  Replace later */}
              <img
                className="rounded-full cursor-pointer"
                onClick={() => (window.location.href = artist.link)}
                src={placeholder}
                alt={placeholder}
              />
              <p>{artist.name}</p>
            </div>
          ))}
        </div>

        {/* Display Albums */}
        <h3 className="mt-3">Albums</h3>
        <div className="flex gap-6 text-white">
          {albums.map((album) => (
            <div key={album.id}>
              {/* <img src={album.image} alt={placeholder} />      replace later */}
              <img
                src={placeholder}
                alt={placeholder}
                onClick={() => (window.location.href = album.link)}
              />
              <p>{album.title}</p>
              <p>{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicListing;
