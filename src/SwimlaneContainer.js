import React from 'react';
import Swimlane from "./Swimlane";
import { DragDropContext } from 'react-beautiful-dnd';

class SwimlaneContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swimlanes: ["A", "B", "C"],
            items: props.items
        };
    }

    onDragEnd = (arg) => {
        console.log(arg);
    }
    render() {

        let swimlanes = [];
        for (const [index, value] of this.state.swimlanes.entries()) {
            swimlanes.push(<Swimlane id={index} name={value} items={this.state.items}></Swimlane>)
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