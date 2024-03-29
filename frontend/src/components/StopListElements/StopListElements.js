import React, { useEffect, useState } from 'react';
import styles from './StopListElements.module.css';
import StopListElement from "../StopListElement/StopListElement";
import { Collapse, Container, Stack, Button } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import { GripHorizontal } from "react-bootstrap-icons";
import client from "../../utils/client";

const StopListElements = () => {
    const [stopListElements, setStopListElements] = useState([]);
    const [show, setShow] = useState(false);
    const [addingNewElement, setAddingNewElement] = useState(false);
    const [newElement, setNewElement] = useState('');

    const handlers = useSwipeable({
        onSwipedUp: () => setShow(false),
        onSwipedDown: () => setShow(true),
    });

    async function getStopListElements() {
        try {
            const response = await fetch(client.baseUrl + "/api/dishes", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert(errorText);
                return [];
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching stop list elements:', error);
            return [];
        }
    }

    const handleUpdateElement = async (updatedElement) => {
        const updatedElements = !updatedElement.name.trim()
            ? stopListElements.filter(element => element.id !== updatedElement.id)
            : stopListElements.map(element => element.id === updatedElement.id ? updatedElement : element);

        setStopListElements(updatedElements);

        const requestBody = {
            dishId: updatedElement.id,
            name: updatedElement.name,
        };

        const response = await fetch(`${client.baseUrl}/api/update_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    };

    const handleAddElement = async () => {
        if (!addingNewElement) {
            setAddingNewElement(true);
        } else {
            if (newElement.trim() !== '') {
                const requestBody = {
                    name: newElement,
                };

                const response = await fetch(`${client.baseUrl}/api/add_dish`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                const updatedElements = [...stopListElements, {id: Date.now(), name: newElement}];
                setStopListElements(updatedElements);
                setNewElement('');
                setAddingNewElement(false);
            }
        }
    };

    useEffect(() => {
        if (show) {
            getStopListElements().then(setStopListElements);
        }
    }, [show]);

    return (
        <>
            <div className={`${styles.Modal} ${show ? styles.ShowModal : styles.HideModal}`} />
            <Container
                className={`rounded-bottom-5 ps-5 pe-5 bg-light ${styles.Container}`}
                {...handlers}
            >
                <Collapse in={show} className={`${styles.Collapse}`}>
                    <Stack gap={3} className={`${styles.StopListElements} mt-5 mb-5`} data-testid="StopListElements">
                        {stopListElements.map((element, index) => (
                            <StopListElement
                                key={index}
                                stopListElement={element}
                                onUpdate={handleUpdateElement}
                            />
                        ))}
                        {addingNewElement && (
                            <textarea
                                autoFocus
                                value={newElement}
                                onChange={(e) => setNewElement(e.target.value)}
                                onBlur={handleAddElement}
                                placeholder="Enter new item..."
                            />
                        )}
                        {!addingNewElement &&
                            <Button onClick={handleAddElement}>Add</Button>
                        }
                    </Stack>
                </Collapse>
                <span className={styles.Bar}><GripHorizontal /></span>
            </Container>
        </>
    );
};

export default StopListElements;
