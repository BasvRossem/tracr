import React from "react";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const SecurityTokenStyle = {
    margin: "16px"
};

export function SecurityToken() {
    const [show, setShow] = React.useState(false);    
    const [token, setToken] = React.useState(sessionStorage.getItem("token"));

    const setTokenInStore = (newToken: string) => {
        sessionStorage.setItem("token", newToken);
        setToken(newToken)
    }

    return (
        <TextField  
            sx={SecurityTokenStyle}
            id="filled-basic" 
            label="Token" 
            value={token}
            type={show ? "text" : "password" } 
            onChange={(event) => setTokenInStore(event.target.value)} size="small"
            InputProps={{
                endAdornment: 
                <InputAdornment disableTypography position="end">                       
                    <IconButton onClick={() => setShow(!show)}>
                        <VisibilityIcon />
                    </IconButton>
                </InputAdornment>
            }}
        />
    );
}