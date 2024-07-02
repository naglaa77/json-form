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


const initialData = {
    name: 'Naglaa FOUZ',
    selector: ['Europe'],
};

const renderers = [
    ...materialRenderers,
    { tester: selectControlTester, renderer: selector },
];

function App() {
    const [data, setData] = useState<object>(initialData);
    const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

    console.log("data", data)
    return (
    <div className="App">
        <div className="container">
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={renderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
            />
        </div>

    </div>
  );
}

export default App;
