import React, { useState, useRef, useEffect } from 'react';
import styles from './StopListElement.module.css';
import { Dot } from "react-bootstrap-icons";

const StopListElement = ({ stopListElement, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(stopListElement.name);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const containerRef = useRef(null); // Ссылка на контейнер элемента
    const inputRef = useRef(null); // Ссылка на поле ввода текста

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSave = () => {
        onUpdate({ ...stopListElement, name });
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
        // Проверяем, был ли клик выполнен вне контейнера элемента или поля ввода
        if (
            containerRef.current && !containerRef.current.contains(e.target) &&
            inputRef.current && !inputRef.current.contains(e.target)
        ) {
            handleSave(); // Сохраняем изменения
        }
    };

    useEffect(() => {
        // Добавляем обработчик события клика для всего документа
        document.addEventListener("click", handleClickOutside);

        // Убираем обработчик события при размонтировании компонента
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []); // Указываем пустой массив зависимостей для вызова эффекта только один раз

    useEffect(() => {
        // Установка фокуса при открытии редактирования
        if (editing && inputRef.current) {
            inputRef.current.focus(); // Устанавливаем фокус
        }
    }, [editing]); // Зависимость от состояния редактирования

    useEffect(() => {
        // Автоматическое сохранение после изменения имени
        if (editing) {
            onUpdate({ ...stopListElement, name });
        }
    }, [name]); // Зависимость от изменения имени

    // Функция для обработки текста и возврата первых четырех слов с многоточием для остального
    const truncateText = (text) => {
        const words = text.split(" "); // Разбиваем текст на слова
        if (words.length > 4) {
            return words.slice(0, 4).join(" ") + " ..."; // Возвращаем первые четыре слова с многоточием
        } else {
            return text; // Если слов меньше или равно 4, возвращаем весь текст
        }
    };

    return (
        <div ref={containerRef} className={styles.StopListElement} onClick={handleEdit}>
            {editing ? (
                <>
                    <input
                        ref={inputRef} // Связываем ссылку с элементом input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <Dot /> {truncateText(stopListElement.name)}
                </>
            )}
        </div>
    );
};

export default StopListElement;
