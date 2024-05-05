import React, { useEffect } from "react";
import movie from "../image/movie.jpeg";
import { Modal } from "@mui/material";
import InputField from "../InputField/InputField";
import { style } from "./Screen";
import { createMovieService } from "../../services/movieService";
import { DateRangePicker } from 'rsuite';
import DatePicker from "./DatePicker/DatePicker";
import { getScreenService } from "../../services/screenService";
import MultipleSelectChip from "../InputField/MultipleSelectChip";
const Movie = ({setMovieList,movieList}) => {
  const [open, setOpen] = React.useState(false);
  const [screens, setScreens] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dates, setDates] = React.useState([{ date: "" }]);

  useEffect(() => {
    const getScreens = async () => {
      try {
        setLoading(true);
        const res = await getScreenService();
        setScreens(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    };
    getScreens();
  }, []);

  const handleChangeDate = (index, event) => {
    const values = [...dates];
    values[index].date = event.target.value;
    setDates(values);
    console.log(dates,"===========");
  }

  const [selectedScreen, setSelectedScreen] = React.useState([]);
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedScreen(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [formData, setFormData] = React.useState({
    name: "",
    duration: "",
    releaseDate: "",
    genre: "",
    language: "",
    rating: "",
    description: "",
    poster: "",
    goldPrice: "",
    silverPrice: "",
    platinumPrice: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const availableTime = ["10:00", "13:00", "16:00", "19:00", "22:00"];
      let dataToPost= {
        ...formData,
        availableDate:dates.map((date)=> new Date(date.date).toISOString()),
        availableTime,
        screen:selectedScreen,
        price:{
          gold:formData.goldPrice,
          silver:formData.silverPrice,
          platinum:formData.platinumPrice,
        }
      }
    delete dataToPost.goldPrice;
    delete dataToPost.silverPrice;
    delete dataToPost.platinumPrice;
      const response = await createMovieService(dataToPost);
      console.log(response);

      if (response.status === 201) {
        alert("Movie created successfully");
        handleClose();
        setFormData({
          name: "",
          duration: "",
          releaseDate: "",
          genre: "",
          language: "",
          rating: "",
          description: "",
          poster: "",
          goldPrice: "",
          silverPrice: "",
          platinumPrice: "",
        });
        setMovieList([...movieList, response.data.data]);
      }
    } catch (error) {
      alert(error?.response?.data|| "something error")
      console.log(error);
    }
  };

  if(loading){
    return <h1>Loading...</h1>
  }



  return (
    <div>
      <img className="mb-3" src={movie} alt="" />
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => handleOpen()}
      >
        Create Movie
      </button>

      <Modal open={open} onClose={handleClose}>
        <form>
          <div className="bg-[#ffff] flex gap-5" style={{ ...style, width: "70%" }}>
            <div>
              <InputField
                name={"name"}
                type="text"
                label={"Name"}
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                name={"duration"}
                type="number"
                label={"Duration"}
                value={formData.duration}
                onChange={handleChange}
              />
              <InputField
                name={"genre"}
                type="text"
                label={"Genre"}
                value={formData.genre}
                onChange={handleChange}
              />
              <InputField
                name={"language"}
                type="text"
                label={"Language"}
                value={formData.language}
                onChange={handleChange}
              />
              <InputField
                name={"rating"}
                type="number"
                label={"rating"}
                value={formData.rating}
                onChange={handleChange}
              />
              <MultipleSelectChip screens={screens} name={"Screens"} value={selectedScreen} handleChange={handleChangeSelect}/>
            </div>
            <div>
              <InputField
                name={"poster"}
                type="text"
                label={"Poster"}
                value={formData.poster}
                onChange={handleChange}
              />
              <InputField
                name={"goldPrice"}
                type="number"
                label={"Gold Price"}
                value={formData.goldPrice}
                onChange={handleChange}
              />
              <InputField
                name={"silverPrice"}
                type="number"
                label={"Silver Price"}
                value={formData.silverPrice}
                onChange={handleChange}
              />
              <InputField
                name={"platinumPrice"}
                type="number"
                label={"Platinum Price"}
                value={formData.platinumPrice}
                onChange={handleChange}
              />
              <DatePicker handleChange={handleChangeDate} dates={dates} setDates={setDates}/>
              <div className="gap-10 text-right">
                <button onClick={handleClose}>Close</button> 
                <button
                onClick={handleSubmit}
                  class=" ml-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Movie;
