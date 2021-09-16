import React from 'react';
import ReactDOM from 'react-dom';
import { Parent } from './Parent';
import { StateProvider } from './Component/StateProvider';
import reducer, {initialState} from "./Component/reducer";

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
    <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <Parent />
    </StateProvider>
   
  </React.StrictMode>,
    root
);