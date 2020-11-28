import React from 'react';
import Swimlane from "./Swimlane";
import { DragDropContext } from 'react-beautiful-dnd';

class SwimlaneContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
            columns: ["A"],
        };
    }

    onDragEnd = (arg) => {
        const { destination, source, draggableId } = arg;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        this.state.items.move(source.index, destination.index);

        this.setState({items: this.state.items});
    }
    render() {

        let swimlanes = [];
        for (const [index, value] of this.state.columns.entries()) {
            swimlanes.push(<Swimlane id={value} name={value} items={this.state.items} key={index}></Swimlane>)
        }

        return (

            <div className="Swimlanes">
                <DragDropContext
                onDragEnd={this.onDragEnd}
                >
                    {swimlanes}
                </DragDropContext>
            </div>
        );
    }
}

export default SwimlaneContainer;