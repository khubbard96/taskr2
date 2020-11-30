import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
export default function List({ data }) {
    const { id, title, items } = data;
    return (
        <div className="list Swimlane-container">
            <div className="title">{title}</div>
            <Droppable droppableId={id}>
                {provided => (
                    <div
                        className="list-content Swimlane"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <ListItem key={item.id} item={item} index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}