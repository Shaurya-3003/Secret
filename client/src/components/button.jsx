import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function MyButton(props) {
    let navigate = useNavigate();
    return (
        <div className="btn">
            <Button size="medium" variant="contained" className="btn" onClick={() => {
                navigate(props.route);
            }}>
                {props.title}
            </Button>
        </div>
    )
}