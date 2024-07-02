import React, { useState } from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";

interface RatingControlProps {
    data: any;
    handleChange(path: string, value: any): void;
    path: string;
}

interface ContinentCountry {
    continent: string;
    countries: string[];
}

const continents: ContinentCountry[] = [
    { continent: "Europe", countries: ["Belgium", "France"] },
    { continent: "Afrique", countries: ["Egypt", "Syria"] }
];

const Selector = ({ data, handleChange, path }: RatingControlProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(data || []);

    const handleOnChange = (event: React.SyntheticEvent, value: string[]) => {
        const lastSelectedValue = value[value.length - 1];
        const continent = continents.find(c => c.continent === lastSelectedValue);
        if (continent) {
            // If a continent is selected, select all its countries
            const newSelectedValues = Array.from(new Set([...value, ...continent.countries]));
            setSelectedValues(newSelectedValues);
            handleChange(path, newSelectedValues);
        } else {
            setSelectedValues(value);
            handleChange(path, value);
        }
    };

    const options = continents.flatMap(group => [group.continent, ...group.countries]);

    return (
        <div>
            <Autocomplete
                sx={{ m: 1, width: 500 }}
                multiple
                options={options}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox style={{ marginRight: 8 }} checked={selected} />
                        {option}
                    </li>
                )}
                value={selectedValues}
                onChange={handleOnChange}
                renderInput={(params) => <TextField {...params} label="Select Continent and Countries" />}
                disableCloseOnSelect
            />
        </div>
    );
};

export default withJsonFormsControlProps(Selector);