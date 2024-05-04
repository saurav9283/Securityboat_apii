import React from "react";

const DatePicker = ({setDates,dates,handleChange}) => {
  const addFields = (event) => {
      event.preventDefault();
    setDates([...dates, { date: "" }]);
  };

  

  return (
    <div>
      <button onClick={addFields}>Add</button>
      {dates.map((date, index) => (
        <div key={index}>
          <input type="date" name="startDate" id="" onChange={(e)=>handleChange(index,e)} />
        </div>
      ))}
    </div>
  );
};

export default DatePicker;
