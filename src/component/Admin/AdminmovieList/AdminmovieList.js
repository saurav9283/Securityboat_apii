import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import { Button } from '@mui/material';
import { MoveRight, Trash2 } from 'lucide-react';
import { deleteMovieService, getMoviesService } from '../../../services/movieService';
import axios from 'axios';

const AdminmovieList = ({movieList,setMovieList}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const moveRightRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMoviesService();
        console.log(response.data.data);
        setMovieList(response.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (id) => { 
    try {
      // console.log(id)
      const response = await deleteMovieService(id)
      console.log(response.data);
      const newMovieList = movieList.filter((movie) => movie._id !== id);
      setMovieList(newMovieList);
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  return (
    <div>
      <div className="flex gap-10 font-bold ml-5">
        <span>List of Movies</span>
        <MoveRight ref={moveRightRef} />
      </div>
      <div ref={emblaRef} className="overflow-hidden m-5">
        <div className="flex mt-1 gap-7">
          {movieList.map((movie, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              sx={{ minWidth: "250px", minHeight: "300px", position: "relative" }}
            >
              <CardActionArea>
                {hoverIndex === index && (
                  <Trash2
                    size={30}
                    className='absolute top-2 right-2 bg-red-500 rounded-full p-2 cursor-pointer'
                    onClick={() => handleDelete(movie._id)} 
                  />
                )}
                <CardMedia
                  style={{ height: "200px", width: "280px" }}
                  component="img"
                  image={movie?.poster}
                  alt={movie.name}
                />
                <Typography gutterBottom className="text-xs font-bold" component="div">
                  Movie Name - {movie.name}
                </Typography>
                <Typography gutterBottom className="text-xs" component="div">
                  Language - {movie.language}
                </Typography>
                <Typography gutterBottom className="text-xs" component="div">
                  Hall - {movie.screen[0].screenNumber}
                </Typography>
                <CardContent className="flex gap-10 items-end justify-between">
                  <div>
                    <Typography
                      gutterBottom
                      component="div"
                      className="flex justify-center"
                    >
                      <span className="text-xs">{movie.cast}</span> 
                    </Typography>
                  </div>
                  <div className="mt-[-50px] gap-10">
                    <Rating
                      style={{ minWidth: "80px" }}
                      name="read-only"
                      value={movie.rating}
                      readOnly
                    />
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminmovieList;
