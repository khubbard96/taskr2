import { useState } from "react"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TaskrEditor.css";

export default function TasrkEditor(props) {


    var [tempAppData, setTempAppData] = useState(props.appData)
    //var tempAppData = props.appData;
    var [show, setShow] = useState(props.show);
    const handleHideEdit = () => setShow(false);

    const onChangeColumnTitle = (e) => {
        const colId = e.currentTarget.dataset.column
        const oldColumn = tempAppData.columns.find(col => col.id === colId);
        const newColumn = {
            ...oldColumn,
            title: e.currentTarget.value,
        }
        const newData = {
            ...tempAppData,
            columns: tempAppData.columns.map((val, idx)=> (val.id === colId ? newColumn : tempAppData.columns[idx]))
        }
        //setTempAppData(newData);
        tempAppData = newData;
    }

    const onReorderColumns = result => {
        console.log(result);
        const fromIdx = result.source.index;
        const toIdx = result.destination.index;

        var colValues = Object.values(tempAppData.columns);
        const [removedItem] = colValues.splice(fromIdx, 1);
        colValues.splice(toIdx, 0, removedItem);
        const newData = {
            ...tempAppData,
            columns: colValues
        }
        setTempAppData(newData);
        //tempAppData = newData;

    }

    const onSaveChanges = (e) => {
        props.onSaveChanges(tempAppData);
    }

    const updateModal = (e) => {
        setTempAppData(props.appData);
    }

    return (
        <Modal 
            show={props.show} 
            onShow={updateModal}
            className="Taskr-editor"
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h3>Columns</h3>
                    <div className="columns-list">

                        <DragDropContext onDragEnd={onReorderColumns}>
                            <Droppable droppableId="column-reorder-droppable" type="COL-REORDER">
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}>
                                        {Object.values(tempAppData.columns).map((value, index) => (
                                            <Draggable draggableId={"col-reorder-item-"+ index} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="col-reorder-item column-desc">
                                                        <div>Index: {index + 1}</div>
                                                        <input value={value.title} onChange={onChangeColumnTitle} data-column={value.id} />

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>




                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHideEdit}>
                    Close
            </Button>
                <Button variant="primary" onClick={onSaveChanges}>
                    Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}