import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="App container">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};

export default MainLayout;
