import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import {withJsonFormsControlProps} from "@jsonforms/react";


const names = [
    " Europe",
    "Afrique",
];


const Selector = () => {
    return (
        <Autocomplete
            sx={{ m: 1, width: 500 }}
            multiple
            options={names}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            onChange={(event, value) => {
                console.log("value", value);}
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Multiple Autocomplete"
                    placeholder="Multiple Autocomplete"
                />
            )}
        />
    );
}
export default withJsonFormsControlProps(Selector);