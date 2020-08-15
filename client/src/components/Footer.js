import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Read A Lot</p>
        <p><i class="material-icons">code</i> with <i class="material-icons heart">favorite</i> by <a href="https://github.com/edwinmunguia">Edwin Munguia</a></p>
      </div>
    </footer>
  );
};

export default Footer;
