import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

class TaskrItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.item;
    }

    render() {
        let draggableId = 'draggable-' + this.state.id;
        return (
            <Draggable draggableId={draggableId} index={this.state.id}>
                {(provided, snapshot) => (
                    <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="Taskr-item">
                        {this.state.title} {this.state.id}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default TaskrItem;