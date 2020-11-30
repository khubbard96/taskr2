import React, { useState, useRef, useEffect } from "react";
import Card from "react-bootstrap/Card";


export default function EditableTextBox({ item }) {
    const [data, setData] = useState(item);
    const [showEditor, setEditVisible] = useState(false);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function handleTextClick(e) {
        setEditVisible(true);
    }
    function handleSubmitText(e) {
        const newState = {
            ...item,
            subtext: e.currentTarget.value
        }
        setData(newState);
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    event.currentTarget.dispatchEvent(new Event("blur"));
                }
            }

            // Bind the event listener
            document.addEventListener("click", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef}>
            <Card.Text
                contentEditable={true}
                onChange={handleSubmitText}
            >
                {data.subtext}
            </Card.Text>
        </div >

    )

}

