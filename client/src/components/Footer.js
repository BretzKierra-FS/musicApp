import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-musicViolet h-20 fixed bottom-0 w-full">
      &copy; {currentYear} Created by Kierra Bretz
    </footer>
  );
};

export default Footer;
