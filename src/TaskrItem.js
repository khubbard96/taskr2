import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

class TaskrItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.item.getId(),
            item: props.item,
            draggableIdx: props.draggableIdx
        }
    }

    render() {
        return (
            <Draggable draggableId={this.state.draggableIdx+""} index={this.state.draggableIdx}>
                {(provided, snapshot) => (
                    <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="Taskr-item">
                        {this.state.item.getTitle()}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default TaskrItem;