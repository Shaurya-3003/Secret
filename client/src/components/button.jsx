import React from "react";
import Button from "@mui/material/Button";

export default function MyButton(props){
    return (
        <div className="btn hidden">
        <Button href={props.route} size="medium" variant="contained" className="btn">
            {props.title}
        </Button>
        </div>
    )
}