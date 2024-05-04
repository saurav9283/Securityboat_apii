import React from "react";
import banner from "../image/header.png";

// import MovieList from "../MovieList/MovieList";

const Header = () => {
  return (
    <>
    <div className="relative">
    <img
        src={banner}
        style={{ height: "100%", width: "140%",opacity: 0.85 }}
        alt="Banner"
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mt-[-25%]">Discover Movies</h1>
        <h1 className="text-3xl md:text-5xl font-semibold mt-2">Stay Tuned for Updates!</h1>
        <p className="text-sm md:text-[20px] font-medium mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet interdum, ac aliquet odio.
        </p>
      </div>

    </div>
    {/* <MovieList/> */}
    </>
  );
};

export default Header;
