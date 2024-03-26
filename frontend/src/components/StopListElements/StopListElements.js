// StopListElements.js

import React, { useEffect, useState } from 'react';
import styles from './StopListElements.module.css';
import StopListElement from "../StopListElement/StopListElement";
import { Collapse, Container, Stack } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import { GripHorizontal } from "react-bootstrap-icons";
import client from "../../utils/client";

const StopListElements = () => {
    const [stopListElements, setStopListElements] = useState([]);
    const [show, setShow] = useState(false);
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

    const handleUpdateElement = (updatedElement) => {
        // Обновляем локальное состояние
        const updatedElements = stopListElements.map(element => {
            if (element.id === updatedElement.id) {
                console.log("here" + element.id);
                return updatedElement;
            } else {
                return element;
            }
        });
        setStopListElements(updatedElements);

        // Отправляем обновления на сервер
        // sendUpdateToServer(updatedElement);
    };

    const sendUpdateToServer = async (updatedElement) => {
        try {
            const response = await fetch(client.baseUrl + `/api/dishes/${updatedElement.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedElement),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error updating stop list element:', errorText);
            }
        } catch (error) {
            console.error('Error updating stop list element:', error);
        }
    };

    useEffect(() => {
        if (show) {
            getStopListElements().then(setStopListElements);
        }
    }, [show]); // Запускаем useEffect только при изменении show

    return (
        <>
            <div className={`${styles.Modal} ${show ? styles.ShowModal : styles.HideModal}`}/>
            <Container
                className={`rounded-bottom-5 ps-5 pe-5 bg-light ${styles.Container}`}
                {...handlers}
            >
                <Collapse in={show}>
                    <Stack gap={3} className={`${styles.StopListElements} mt-5 mb-5`} data-testid="StopListElements">
                        {stopListElements.map((element, index) => (
                            <StopListElement
                                key={index}
                                stopListElement={element}
                                onUpdate={handleUpdateElement}
                            />
                        ))}
                    </Stack>
                </Collapse>
                <span className={styles.Bar}><GripHorizontal/></span>
            </Container>
        </>
    );
};

export default StopListElements;
