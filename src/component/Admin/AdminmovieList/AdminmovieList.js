import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import { Button } from '@mui/material';
import { MoveRight } from 'lucide-react';
import { getMoviesService } from '../../../services/movieService';

const AdminmovieList = () => {
  const [movieList, setMovieList] = React.useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const moveRightRef = useRef(null);

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

  return (
    <div>
      <div className="flex gap-10 font-bold ml-5">
        <span>List of Movies</span>
        <MoveRight ref={moveRightRef} />
      </div>
      <div ref={emblaRef} className="overflow-hidden m-5">
        <div className="flex mt-1 gap-7">
          {movieList.map((movie, index) => (
            <Card key={index} sx={{ minWidth: "250px", minHeight: "300px" }}>
              <CardActionArea>
                <CardMedia
                  style={{ height: "200px",width:"280px" }}
                  component="img"
                  image={movie.poster}
                  alt={movie.name}
                />
                <Typography gutterBottom className="text-xs font-bold" component="div">
                  Movie Name- {movie.name}
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
