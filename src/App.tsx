import React, {useMemo, useState} from 'react';
import './App.css';
import { JsonForms } from '@jsonforms/react';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import schema from './schema.json';
import uischema from './uischema.json';
import selectControlTester from "./selectControlTester";
import selector from "./components/Selector";
import { Typography } from '@mui/material';
import nameControlTester from "./nameControlTester";



const initialData = {
    nameUser: '',
    selector: [],
};

const renderers = [
    ...materialRenderers,
    { tester: selectControlTester, renderer: selector },
    {tester: nameControlTester, renderer: 'NameUser'}
];

function App() {
    const [data, setData] = useState<object>(initialData);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    console.log("data", data)
    return (
        <div className="App"
             style={{width: "100vw", boxSizing: "border-box", margin: "0", padding: "1rem"}}>
            <div className="container">

                <Typography variant="h4">Your Information</Typography>
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={data}
                    renderers={renderers}
                    cells={materialCells}
                    onChange={({data}) => setData(data)}
                />
            </div>
            <pre>{stringifiedData}</pre>
        </div>
    );
}

export default App;
