import React, {useEffect, useState} from 'react';
import styles from './StopListElements.module.css';
import StopListElement from "../StopListElement/StopListElement";
import {Button, Stack} from "react-bootstrap";
import client from "../../utils/client";

const StopListElements = () => {
    const [stopListElements, setStopListElements] = useState([]);
    const [addingNewElement, setAddingNewElement] = useState(false);
    const [newElement, setNewElement] = useState('');

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
        getStopListElements().then(setStopListElements);
    }, []);

    return (
        <>
            <div/>
            <Stack gap={3} style={{marginTop: "1rem"}} className={`${styles.StopListElements} mt-5 mb-5`}>
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
                    <Button style={{
                        width: "60%",
                        marginRight: "auto",
                        marginLeft: "auto"
                    }} onClick={handleAddElement}>Add</Button>
                }
            </Stack>
        </>
    );
};

export default StopListElements;
