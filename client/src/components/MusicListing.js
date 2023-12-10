import { useEffect, useState } from 'react';
import { mockAlbums, mockSongs, mockArtists } from '../mock/mockData';
import placeholder from '../images/placeholder.png';
import { search } from '../services/spotify';

function MusicListing(props) {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState(mockSongs);
  const [albums, setAlbums] = useState(mockAlbums);
  const [artists, setArtists] = useState(mockArtists);

  // mock search logic
  const handleSearch = async (keyword) => {
    try {
      const response = await search(keyword, props.accessToken); // Assuming you have 'accessToken' in your component state

      // Update state with new data format
      setTracks(response.tracks.items || []);
      setAlbums(response.albums.items || []);
      setArtists(response.artists.items || []);
    } catch (error) {
      console.error('Error searching:', error);
      // Handle the error as needed (e.g., show an error message)
    }
  };

  return (
    <div className="w-3/4 m-auto mt-20 mb-32">
      {/* Search form to search keywords */}
      <div id="searchListing" className="w-3/4 m-auto mt-20">
        <input
          className="mb-10"
          type="text"
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="text-white ml-1 bg-musicViolet pl-1 pr-1"
          onClick={() => handleSearch(keyword)}
        >
          Search
        </button>

        {/* Display Songs */}
        <h3>Songs</h3>
        <div className="flex gap-6 text-white">
          {tracks.map((track) => (
            <div key={track.id}>
              <img
                className="rounded-md max-h-48 cursor-pointer"
                src={track.album.images?.[0]?.url || placeholder}
                alt={placeholder}
                onClick={() =>
                  (window.location.href = track.external_urls?.spotify || '#')
                }
              />
              <p>{track.name}</p>
              <p>{track.artists?.[0]?.name}</p>
            </div>
          ))}
        </div>

        {/* Display Artists */}
        <h3 className="mt-3">Artists</h3>
        <div className="flex gap-6 text-white">
          {artists.map((artist) => (
            <div key={artist.id}>
              <img
                className=" rounded-full cursor-pointer max-h-48 "
                onClick={() =>
                  (window.location.href = artist.external_urls?.spotify || '#')
                }
                src={artist.images?.[0]?.url || placeholder}
                alt={placeholder}
              />
              <p>{artist.name}</p>
            </div>
          ))}
        </div>

        {/* Display Albums */}
        <h3 className="mt-3">Albums</h3>
        <div className="flex gap-6 text-white ">
          {albums.map((album) => (
            <div key={album.id}>
              <img
                className="max-h-48  cursor-pointer"
                src={album.images?.[0]?.url || placeholder}
                alt={placeholder}
                onClick={() =>
                  (window.location.href = album.external_urls?.spotify || '#')
                }
              />
              <p>{album.name}</p>
              <p>{album.artists?.[0]?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicListing;
