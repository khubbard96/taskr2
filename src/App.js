import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import getData from "./getData";
import List from "./List";

const columns = getData(4);
const data = {
    columns: {}
}
for (let i = 0; i < columns.length; i++) {
    data.columns[i] = columns[i];
}

export default function App() {
    const [appData, setData] = useState(data);

    //drag drop core;
    const onDragEnd = result => {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = appData.columns[source.droppableId];
        const finish = appData.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.items);
            let [removedItem] = newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, removedItem);

            const newColumn = {
                ...finish,
                items: newTaskIds,
            };

            const newState = {
                ...appData,
                columns: {
                    ...appData.columns,
                    [newColumn.id]: newColumn,
                },
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
            columns: {
                ...appData.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        setData(newState);
    };
    return (
        <div className="App">
            <h1>Taskr</h1>
            <div className="Swimlanes">
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        Object.values(appData.columns).map((column, index)=>(
                            <List data={column} />
                        ))
                    }
                </DragDropContext>
            </div>

        </div>
    );
}