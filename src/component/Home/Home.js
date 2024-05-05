import React, { useEffect } from "react";
import Nav from "../Navbar/Nav.js";
import Header from "../Header/Header.js";
import Recommended from "../Recommended/Recommended.js";
import Admin from "../Admin/Admin.js";
import AdminmovieList from "../Admin/AdminmovieList/AdminmovieList.js";
import { getMoviesService } from "../../services/movieService.js";

const Home = () => {
  const [movieList, setMovieList] = React.useState([]);

  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.isAdmin || false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMoviesService();
        // console.log(response.data.data);
        setMovieList(response.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchData();
    
  }, []);
  return (
    <div>
      <Nav />
      {isAdmin ? (
        <>
        <Admin setMovieList={setMovieList} movieList={movieList}/>
        <AdminmovieList setMovieList={setMovieList} movieList={movieList} />

        </>
      ) : (
        <div>
          <Header />
          <Recommended movieList={movieList} />
        </div>
      )}
    </div>
  );
};

export default Home;
