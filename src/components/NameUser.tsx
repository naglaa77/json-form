import React from 'react';
import { TextField } from '@mui/material';
import { withJsonFormsControlProps } from '@jsonforms/react';

interface CustomNameFieldProps {
    data: string;
    handleChange: (path: string, value: any) => void;
    path: string;
}

const NameUser = ({ data, handleChange, path }: CustomNameFieldProps) => {
    return (
        <TextField
            fullWidth
            label="Enter Your Name"
            variant="outlined"
            value={data || ''}
            onChange={(event) => handleChange(path, event.target.value)}
        />
    );
};

export default withJsonFormsControlProps(NameUser);