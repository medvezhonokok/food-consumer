import React, { useEffect, useRef, useState } from 'react';
import styles from './StopListElement.module.css';
import { Dot } from "react-bootstrap-icons";

const StopListElement = ({ stopListElement, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(stopListElement.name);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        onUpdate({...stopListElement, name});
        setEditing(false);
        setIsEditingActive(false);
    };

    const handleEdit = () => {
        if (!isEditingActive) {
            setEditing(true);
            setIsEditingActive(true);
        }
    };

    const handleClickOutside = (e) => {
        if (
            containerRef.current && !containerRef.current.contains(e.target) &&
            inputRef.current && !inputRef.current.contains(e.target)
        ) {
            handleSave();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [editing]);

    useEffect(() => {
        if (editing) {
            onUpdate({...stopListElement, name});
        }
    }, [name]);

    const truncateText = (text) => {
        if (text.length > 35) {
            return text.substring(0, 35) + " ...";
        } else {
            return text;
        }
    };

    return (
        <div ref={containerRef} className={styles.StopListElement} onClick={handleEdit}>
            {editing ? (
                <textarea
                    ref={inputRef}
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleSave}
                />
            ) : (
                <>
                    <Dot /> {truncateText(stopListElement.name)}
                </>
            )}
        </div>
    );
};

export default StopListElement;
