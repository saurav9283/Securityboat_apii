import React, { useState } from "react";
import hall from "../image/hall.jpeg";
import movie from "../image/movie.jpeg";
import { Button, Modal } from "@mui/material";
import InputField from "../InputField/InputField";
import { createScreenService } from "../../services/screenService";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  background: "white",
  padding: 20,
  borderRadius: 5,
};
const Screen = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    screenNumber: null,
    capacity: {
      gold: null,
      silver: null,
      platinum: null,
    },
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCapacityChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      capacity: { ...formData.capacity, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await createScreenService({ ...formData });
      console.log(response);
      if (response.status === 201) {
        alert("Hall created successfully");
        handleClose();
        setFormData({
          name: "",
          screenNumber: null,
          capacity: {
            gold: null,
            silver: null,
            platinum: null,
          },
        });
      }
    } catch (error) {
      alert(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <img className="mb-3" src={hall} alt="" />
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => handleOpen()}
        >
          Create Hall
        </button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="bg-[#ffff]" style={style}>
          <form onSubmit={handleSubmit}>
            <InputField
              name={"name"}
              type="text"
              label={"Name"}
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              type="number"
              name={"screenNumber"}
              label={"Screen Number"}
              value={formData.screenNumber}
              onChange={handleChange}
            />
            <InputField
              type="number"
              name={"gold"}
              label={"Gold Capacity"}
              value={formData.capacity.gold}
              onChange={handleCapacityChange}
            />
            <InputField
              type="number"
              name={"silver"}
              label={"Silver Capacity"}
              value={formData.capacity.silver}
              onChange={handleCapacityChange}
            />
            <InputField
              type="number"
              name={"platinum"}
              label={"Platinum Capacity"}
              value={formData.capacity.platinum}
              onChange={handleCapacityChange}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Screen;
