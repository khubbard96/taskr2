import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import EditableTextBox from './EditableTextBox';

export default function ListItem({ item, index }) {
    const { id, title } = item;
    const [data, setData] = useState(item);
    
    const [showEditor, setEditVisible] = useState(false);


    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list-item"
                >
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <EditableTextBox item={item}></EditableTextBox>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}