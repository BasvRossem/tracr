import { Link, Outlet } from "react-router-dom";
import { Drawer } from "../components/Drawer";
import { Box } from "@mui/system";
import LabelIcon from '@mui/icons-material/Label';

import "./settings.css";

const boxStyle = {
    flexGrow: 1,
    p: 3
};


export default function Settings() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer>
                <Link to="tickets" style={{textDecoration: "none", color: "black"}}>
                    <div className="linkButton">
                        <LabelIcon /> <p>Tickets</p> 
                    </div>
                    
                </Link>
            </Drawer>

            <Box
                component="main"
                sx={boxStyle}
            >
                <Outlet />
            </Box>
        </Box>
    )
}