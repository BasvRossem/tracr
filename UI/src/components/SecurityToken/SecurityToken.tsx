import React from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, InputAdornment, TextField } from "@mui/material";

const SecurityTokenStyle = {
  margin: "16px"
};

export function SecurityToken() {
  const [show, setShow] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("token") ?? "");

  const setTokenInStore = (newToken: string) => {
    console.log("Setting token to", newToken);
    localStorage.setItem("token", newToken);
    console.log("Token is now", localStorage.getItem("token"));
    setToken(newToken);
  }

  return (
    <TextField
      sx={SecurityTokenStyle}
      id="filled-basic"
      label="Token"
      value={token}
      type={show ? "text" : "password"}
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