import React from 'react';
import TaskrItem from './TaskrItem';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

class Swimlane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            id: props.id,
            items: props.items
        }
    }
    render() {
        let itemsContained = [];
        let items = this.state.items.toArray()
        for (let i = 0; i < items.length; i++) {
            itemsContained.push(<TaskrItem key={items[i].getId()} item={items[i]} id={items[i].getId()} draggableIdx={i}></TaskrItem>)
        }
        return (
            <div className="Swimlane">
                <div>
                    {this.state.name}
                </div>
                <div className="Swimlane-tasks">
                    <Droppable droppableId={this.state.id} type="TASK">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                                {itemsContained}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

            </div>
        );
    }
}

export default Swimlane;