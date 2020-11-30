import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import getData from "./getData";
import List from "./List";
import TaskrEditor from "./TaskrEditor";

const columns = getData(4);
const data = {
    columns: columns
}
/*for (let i = 0; i < columns.length; i++) {
    data.columns[i + "1"] = columns[i];
}*/

export default function App() {
    const [appData, setData] = useState(data);
    const [show, setShow] = useState(false);

    //drag drop core;
    const onDragEnd = result => {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        //const start = appData.columns[source.droppableId];
        //const finish = appData.columns[destination.droppableId];

        const startIdx = appData.columns.findIndex(col => col.id === source.droppableId);
        const start = appData.columns[startIdx];
        const finishIdx = appData.columns.findIndex(col => col.id === destination.droppableId);
        const finish = appData.columns[finishIdx];

        if (startIdx === finishIdx) {
            const newTaskIds = Array.from(start.items);
            let [removedItem] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, removedItem);

            const newColumn = {
                ...finish,
                items: newTaskIds,
            };

            const newState = {
                ...appData,
                columns: appData.columns.map((val, idx) => (val.id === finish.id ? newColumn : appData.columns[idx])),
            };

            setData(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.items);
        let [removedItem] = startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            items: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.items);
        finishTaskIds.splice(destination.index, 0, removedItem);
        const newFinish = {
            ...finish,
            items: finishTaskIds,
        };

        const newState = {
            ...appData,
            columns: [
                ...appData.columns,
            ],
        };
        newState.columns[startIdx] = newStart;
        newState.columns[finishIdx] = newFinish;
        setData(newState);
    };

    const handleShowEdit = () => setShow(true);
    const handleHideEdit = () => setShow(false);
    const handleSaveChanges =(newData) => {
        setData(newData);
        setShow(false);
    }
    const onEditClose = () => {

    }

    return (
        <div className="App">
            <div>
                <h1>Taskr</h1>
                <Button
                    variant="primary"
                    onClick={handleShowEdit}
                >
                    Edit Taskr
                </Button>
                <TaskrEditor 
                    show={show}
                    onHideEdit={handleHideEdit}
                    onSaveChanges={handleSaveChanges}
                    appData={appData}
                ></TaskrEditor>
            </div>
            <div className="Swimlanes">
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        appData.columns.map((column, index) => (
                            <List data={column} />
                        ))
                    }
                </DragDropContext>
            </div>

        </div>
    );
}