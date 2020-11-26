import './App.css';
import SwimlaneContainer from './SwimlaneContainer';
import React from "react";
import { DragDropContext } from 'react-beautiful-dnd';

const items = [
    {
        id: 0,
        title: "a title",
        swimlane: 0
    },
    {
        id: 1,
        title: "a title",
        swimlane: 1
    },
    {
        id: 2,
        title: "a title",
        swimlane: 2
    },
]


function App() {
    return (
        <div className="App">
                <SwimlaneContainer items={items}/>
        </div>
    );
}

export default App;
