import logo from '../images/spotify.png';

function Header() {
  return (
    <div>
      <div className=" bg-musicRed h-10 ">
        <img
          src={logo}
          alt="404"
          className=" fixed right-1/2  rounded-full border-musicRed h-24 bg-musicRed 
          "
          style={{ borderWidth: '20px' }}
        />
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
