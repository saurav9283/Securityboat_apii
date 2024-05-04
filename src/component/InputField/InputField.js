import { TextField } from '@mui/material'
import React from 'react'

const InputField = ({name,type,label,value,onChange}) => {
  return (
    <TextField
        id={name}
        name={name}
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
        type={type}
    />
  )
}

export default InputField
