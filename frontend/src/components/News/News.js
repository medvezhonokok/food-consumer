import React, {useEffect, useState} from 'react';
import client from "../../utils/client";
import styles from './News.module.css';

const News = ({user}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(client.baseUrl + '/api/news');
                if (response.ok) {
                    const data = await response.json();
                    setNewsList(data);
                } else {
                    console.error('Failed to fetch news');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddNews = () => {
        if (user && user.admin) {
            setShowAddForm(true);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('file', file);
        formData.append('userId', user.id);

        try {
            const response = await fetch(client.baseUrl + '/api/news/add', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert("Новость добавлена");
                setTimeout(() => {
                    setShowAddForm(false);
                    setDescription('');
                    setFile(null);
                }, 2000);
            } else {
                const errorText = await response.text();
                console.error('Failed to add news: ', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className={styles.newsContainer}>
                {newsList.map((newsItem) => (
                    <div className={styles.newsCard} key={newsItem.id}>
                        <img src={client.baseUrl + "/news/" + newsItem.pathToFile} alt="News"
                             className={styles.newsImage}/>
                        <p className={styles.newsDescription}>{newsItem.description}</p>
                        <p className={styles.newsAuthor}>By: {newsItem.author.name}</p>
                    </div>
                ))}
            </div>
            {showAddForm && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <h2>Add News</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Description:</label>
                            <textarea
                                autoFocus
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                            <label>File:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                required
                            />
                            <button type="submit" className={styles.modalButton}>Add</button>
                        </form>
                    </div>
                </div>
            )}
            {user && user.admin && (
                <button className={styles.addNewsButton} onClick={handleAddNews}>Add News</button>
            )}
        </div>
    );
};

export default News;
