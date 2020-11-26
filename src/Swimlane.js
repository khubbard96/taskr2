import React from 'react';
import TaskrItem from './TaskrItem';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

class Swimlane extends React.Component {
    constructor(props) {
        super(props);
        let _items = props.items.filter(item => item.swimlane == props.id)
        this.state = {
            name: props.name,
            id: props.id,
            items: _items
        }
    }
    render() {
        let droppableId = "droppable-" + this.state.id;
        let itemsContained = [];
        for (const [index, value] of this.state.items.entries()) {
            itemsContained.push(<TaskrItem item={value} />)
        }
        return (
            <div className="Swimlane">
                <div>
                    {this.state.name}
                </div>
                <div className="Swimlane-tasks">
                    <Droppable droppableId={droppableId} type="TASK">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                                {itemsContained}
                            </div>
                        )}
                    </Droppable>
                </div>

            </div>
        );
    }
}

export default Swimlane;