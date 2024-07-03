import React, { useState } from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';


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

    const handleOnChange = (event: React.SyntheticEvent, value: string[], reason: string) => {
        if (reason === 'selectOption') {
            const lastSelectedValue = value[value.length - 1];
            const continent = continents.find(c => c.continent === lastSelectedValue);
            if (continent) {
                // If a continent is selected, select all its countries
                const newSelectedValues = Array.from(new Set([...selectedValues, ...continent.countries]));
                setSelectedValues(newSelectedValues);
                handleChange(path, newSelectedValues);
            } else {
                setSelectedValues(value);
                handleChange(path, value);
            }
        } else {
            // For other reasons (e.g., "removeOption", "clear"), update normally
            setSelectedValues(value);
            handleChange(path, value);
        }
    };


    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: string, state: AutocompleteRenderOptionState) => {
        const isContinent = continents.some(continent => continent.continent === option);
        if (isContinent) {
            return (
                <li {...props} style={{ fontWeight: 'bold' }}>
                    {option}
                </li>
            );
        } else {
            return (
                <li {...props} style={{ paddingLeft: '20px' }}>
                    <Checkbox style={{ marginRight: 8 }} checked={selectedValues.includes(option)} />
                    {option}
                </li>
            );
        }
    };

    // Flatten continents and countries for the options prop
    const options = continents.flatMap(group => [group.continent, ...group.countries]);

    return (
        <div>
            <Autocomplete
                sx={{ mt: 2, width: "100%" }}
                multiple
                options={options}
                getOptionLabel={(option) => option}
                renderOption={renderOption}
                value={selectedValues}
                onChange={handleOnChange}
                renderInput={(params) => <TextField {...params} label="Select Continent and Countries" />}
                disableCloseOnSelect
            />
        </div>
    );
};

export default withJsonFormsControlProps(Selector);