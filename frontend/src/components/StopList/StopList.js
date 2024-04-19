import React, {useEffect, useState} from 'react';
import './StopList.css';
import {IoAddOutline, IoArrowBackSharp} from "react-icons/io5";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import * as storage from "../../data/storage";
import AbstractBox from "../AbstractBox/AbstractBox";
import {Button} from "react-bootstrap";

import Modal from "../Modal/Modal";
import {addStopListElement, removeStopListElement} from "../../data/updater";

const StopList = ({user}) => {
    const [stopList, setStopList] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newStopName, setNewStopName] = useState("");

    useEffect(() => {
        storage.getStopList().then(
            scheduleJson => {
                setStopList(scheduleJson)
            }
        );
    }, []);

    const removeStopListElementById = (stopListElementId) => {
        removeStopListElement({
            stopListElementId: stopListElementId
        }).then(() => {
            window.location.reload();
            alert("Блюдо снято со стопа");
        });
    }

    const mappedStopList = stopList.map((stopListElem, idx) =>
        <div className="stopListContainer">
            <AbstractBox
                key={idx}
                title={idx + 1}
                body={stopListElem.name}
                footer={<Button className="animatedButton removeStopListElementButton"
                                onClick={() => removeStopListElementById(stopListElem.id)}>Снять со стопа</Button>}
            />
        </div>
    );
    const submitForm = () => {
        if (!newStopName || newStopName.trim().length === 0) {

        } else {
            addStopListElement({
                name: newStopName
            }).then((ignored) => {
                // no operations.
            });

            window.location.reload();
            alert("Блюдо поставлено на стоп");
        }
    };

    return (
        user ?
            <div>
                <h3 className="pageHeader">Stop list</h3>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                    <Button className="commonStopListButton animatedButton addButton"
                            onClick={() => setIsFormOpen(true)}>
                        <IoAddOutline/>
                    </Button>
                </div>
                <div className="stopList">
                    {mappedStopList.reverse()}
                </div>
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}>
                    <form onSubmit={submitForm}>
                        <textarea
                            required={true}
                            autoFocus={true}
                            placeholder="Че на стоп ставим?"
                            value={newStopName}
                            onChange={(event) => (setNewStopName(event.target.value))}
                        />
                        <Button className="animatedButton addStopListElementButton" type="submit">На стоп нахуй</Button>
                    </form>
                </Modal>
            </div>
            : <NotFoundPage/>
    );
};

export default StopList;
