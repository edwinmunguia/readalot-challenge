import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="app__body container py-5">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
