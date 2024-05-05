import React, { useEffect, useRef } from "react";
import { MoveRight, MapPin, Trash2 } from "lucide-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Rating } from "@mui/material";
import axios from "axios";
import img from "../image/header.png";
import useEmblaCarousel from "embla-carousel-react";
import {useNavigate} from "react-router-dom";
import { getMoviesService } from "../../services/movieService";

const Recommended = ({movieList}) => {
  // const [movieList, setMovieList] = React.useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const moveRightRef = useRef(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (moveRightRef?.current && emblaRef) {
      moveRightRef?.current.addEventListener("click", () => {
        emblaApi?.scrollNext();
      });
    }
  }, [emblaApi]);

  
  const handleNavigate=(movie) => {
    navigate("/buy-ticket", {state: {movie}})
  }

  return (
    <div className="mt-[-200px]">
      <div className="flex gap-10 font-bold ml-5">
        <span className="text-xl font-bold text-black ">Recommended shows</span>
        {/* <MoveRight ref={moveRightRef} /> */}
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex mt-1 gap-7 m-5">
          {movieList.map((movie, index) => (
            <Card key={index} sx={{ minWidth: "250px", minHeight: "300px" }}>
              
              <CardActionArea>
                <CardMedia
                  style={{ height: "200px" }}
                  component="img"
                  image={movie.poster}
                  alt={movie.title}
                />
                {/* <Trash2 size={15} /> */}
                <Typography gutterBottom  component="div">
                  <h1 className="text-xl font-bold ml-2">{movie.name}</h1>
                </Typography>
                <CardContent className="flex gap-10 mt-[-10px] items-end justify-between">
                  <div>
                    <Typography
                      gutterBottom
                      component="div"
                      className="flex justify-center"
                    >
                      <span className="text-[15px] font-semibold">{movie.genre}</span>
                    </Typography>
                  </div>
                  <div className="mt-[-15px] gap-10">
                    <Rating
                      style={{ minWidth: "80px" }}
                      name="read-only"
                      value={movie.rating}
                      readOnly
                    />
                  </div>
                </CardContent>
                <Button className="w-full" variant="contained" color="success" onClick={() => handleNavigate(movie)}>
                  Book Now
                </Button>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
