import { Checkbox, Tooltip } from "@mui/material";
import { BadgeInfo, HandPlatter, TabletSmartphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";
import { createSeatService, getSheetsService } from "../../services/sheetService";
import axios from "axios";
import { getSeatNumberAndType } from "../../libs/utils";
import { createBookingService, getPaymentsKeyService } from "../../services/paymentServices";
import { PAYMENT_CALLBACK_URL } from "../../libs/constant";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BuyTicket = () => {
  const location = useLocation();
  const price = location.state.movie.price
  // console.log(location)
  // console.log(location.state.movie._id)

  const [open, setOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [value, setValue] = React.useState(0);
  const [disableCheckbox, setDisableCheckbox] = useState([]);
  const movieLanguages = ["English", "Hindi", "German"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let updatedPrice = totalPrice;
  const handleCheckboxChange = (value, category) => {
    const uniqueKey = `${value}${category}`;
    if (selectedCheckboxes.includes(uniqueKey)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== uniqueKey)
      );
      updatedPrice -= price[category];
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, uniqueKey]);
      updatedPrice += price[category];
    }
    setTotalPrice(updatedPrice);
  };

  useEffect(() => {
    const getSheet = async () => {
      try {
        const res = await getSheetsService(location?.state.movie?._id, location?.state?.movie.screen[0]._id);
        const tempraryDisable = res?.data?.data?.map((item) => {
          const currentDate = new Date();
          let seatUpdationDate = new Date(item.updatedAt);
          seatUpdationDate.setMinutes(seatUpdationDate.getMinutes() + 10);
          if (currentDate.getTime() < seatUpdationDate.getTime() || item.status === "BOOKED") {
            return `${item.seatNo}${item.type.toLowerCase()}`;
          }
          return null;
        });

        // console.log(tempraryDisable);

        setDisableCheckbox(tempraryDisable);
      } catch (error) {
        console.log(error)
      }
    };
    getSheet();
  }, []);
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const CheckoutHandel = async (amount) => {
    // const response = await createSeatService({ movie: location.state.movie._id, screen: location.state.movie.screen[0]._id, seat: selectedCheckboxes });
    try {
      const allSelectedSeat = await Promise.all(selectedCheckboxes.map(async (uniqueKey) => {
        const {type,seatNo} = getSeatNumberAndType(uniqueKey);
         // console.log({ movie: location.state.movie._id, screen: location.state.movie.screen[0]._id, seatNo, type: type.toLocaleUpperCase(), amount: price[type] })
         return await createSeatService({ movie: location.state.movie._id, screen: location.state.movie.screen[0]._id, seatNo, type: type.toLocaleUpperCase(), amount: price[type] });
       }));
      const {data: { key }} = await getPaymentsKeyService();
      const selectedSeatId = allSelectedSeat.map((item) => item.data._id);
      // console.log(selectedSeatId,"==================");
      const bookingData ={
        user: user?._id,
        movie: location.state.movie._id,
        screen: location.state.movie.screen[0]._id,
        seats: selectedSeatId,
        amount: updatedPrice,
      }
      // console.log(bookingData,"==================")
      const {data: { order,booking }} = await createBookingService(bookingData);

      const options = {
        key: key, 
        amount: updatedPrice, 
        currency: "INR",
        name: "Testing Getway",
        description: "wdjkbcbckddcb",
        image: "https://avatars.githubusercontent.com/u/87579538?v=4",
        order_id: order.id, 
        callback_url: `${PAYMENT_CALLBACK_URL}?bookingId=${booking?._id}`,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
        rzp1.open();
        
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: { xs: 320, sm: 480 },
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            {[...Array(10)].map((_, index) => (
              <Tab
                key={index}
                label={
                  <div className="flex flex-col ml-5">
                    <div>SUN</div>
                    <div className="font-extrabold">05</div>
                    <div>May</div>
                  </div>
                }
              />
            ))}
          </Tabs>
        </Box>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Movie Name & Language</th>
              <th className="border px-4 py-2">Slot 1</th>
              <th className="border px-4 py-2">Slot 2</th>
              <th className="border px-4 py-2">Slot 3</th>
              <th className="border px-4 py-2">Slot 4</th>
              <th className="border px-4 py-2">Slot 5</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index}>
                <td className="border p-5 w-[330px]">
                  <div className="font-semibold">{location?.state?.movie?.name}: {" "} {movieLanguages[index]} </div>
                  <div className="flex gap-10 mt-2">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <TabletSmartphone className="h-5 w-5 text-[#49ba8e] font-semibold" />
                      </div>
                      <div className="text-[#49ba8e] font-semibold">
                        M Ticket
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2">
                        <HandPlatter className="h-5 w-5 text-[#ffa427]" />
                      </div>
                      <div className="text-[#ffa427]">Food & Beverage</div>
                    </div>
                  </div>
                </td>
                {location?.state?.movie?.availableTime.map((time, index) => (

                  <td className="border-t border-b px-4 py-2 w-[200px]" key={index}>
                    <div
                      onClick={() => handleOpen()}
                      className="border rounded-md bg-[#a2eed1] hover:bg-[#49ba8e] p-2 flex flex-col items-center cursor-pointer"
                    >
                      <div className="text-[15px] font-medium text-[#348f6c]">
                        {time}
                      </div>
                      <div className="text-[16px] font-medium text-[#358a69]">
                        <p>Booking Time</p>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {handleOpen && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] bg-white border-2  shadow-md p-4 flex flex-col">
              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Sets Allocation
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="flex justify-between ">
                        {Object.keys(location?.state?.movie?.screen[0]?.capacity).map((keys, index) => {
                          return (
                            <div className="max-w-[200px]" key={index}>
                              <h1>{keys[0].toLocaleUpperCase() + keys.slice(1, keys.length)}</h1>
                              {Array.from({ length: location?.state?.movie?.screen[0]?.capacity[keys] }).map((_, index) => (
                                <Checkbox
                                  disabled={disableCheckbox.includes(`${index + 1}${keys}`)}
                                  key={index}
                                  {...label}
                                  value={index + 1}
                                  onChange={() => handleCheckboxChange(index + 1, keys)}
                                />
                              ))}

                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Typography>
                {totalPrice > 0 && (
                  <div className="text-red-500 font-medium mt-2">
                    Total Price: {totalPrice}
                  </div>
                )}
              </div>
              <div className="mt-auto flex justify-around">
                <button
                  onClick={() => CheckoutHandel(totalPrice)}
                  type="button"
                  className="w-[40%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Book Now
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className="w-[40%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Close
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default BuyTicket;
