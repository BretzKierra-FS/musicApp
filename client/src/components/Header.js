import logo from '../images/spotify.png';

function Header() {
  return (
    <div>
      <div
        className=" h-10
      "
      >
        <div className="w-full h-10 bg-musicRed fixed">
          <img
            src={logo}
            alt="404"
            className=" fixed right-1/2  rounded-full border-musicRed h-24 bg-musicRed
              "
            style={{ borderWidth: '20px' }}
          />
        </div>
        <h1
          className="fixed right-1/4 font-lobster text-center text-white text-4xl top-5 text"
          style={{
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: '#BE3144',
            letterSpacing: '.1rem',
          }}
        >
          Music Search
        </h1>
      </div>
    </div>
  );
}

export default Header;
