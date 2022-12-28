import React from "react";
import { useDispatch } from 'react-redux';

import { TextField, InputAdornment, IconButton, Button, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Storage } from './../../data/Storage';

const SecurityTokenStyle = {
    margin: "16px"
};

export function SecurityToken() {
    const [show, setShow] = React.useState(false);    
    const setTokenInStore = (token) => {
        Storage.getInstance().token = token;
    }

    return (
        <TextField  
            sx={SecurityTokenStyle}
            id="filled-basic" 
            label="Filled" 
            type={show ? "text" : "password" } 
            onChange={(event) => setTokenInStore(event.target.value)} size="small"
            InputProps={{
                endAdornment: 
                <InputAdornment disableTypography position="end">                       
                    <IconButton onClick={() => setShow(!show)}>
                        <VisibilityIcon />
                    </IconButton>
                </InputAdornment>,
            }}
        />
    );
}