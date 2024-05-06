import React, { useEffect } from "react";
import Nav from "../Navbar/Nav.js";
import Header from "../Header/Header.js";
import Recommended from "../Recommended/Recommended.js";
import Admin from "../Admin/Admin.js";
import AdminmovieList from "../Admin/AdminmovieList/AdminmovieList.js";
import { getMoviesService } from "../../services/movieService.js";
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

const Home = () => {
  const [movieList, setMovieList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();

  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Nav />
      {isAdmin ? (
        <>
          <Admin setMovieList={setMovieList} movieList={movieList} />
          <AdminmovieList setMovieList={setMovieList} movieList={movieList} />
        </>
      ) : (
        <div style={{ position: "relative" }}>
          <Header />
          {loading ? (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress color="secondary" className="bg-black"/>
            </Box>
          ) : (
            <Recommended movieList={movieList} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
