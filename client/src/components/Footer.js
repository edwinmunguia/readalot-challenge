import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Read A Lot</p>
        <p>Created by Edwin Munguia</p>
      </div>
    </footer>
  );
};

export default Footer;
