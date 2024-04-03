import React, {useEffect, useState} from 'react';
import client from "../../utils/client";
import styles from './News.module.css';
import axios from "axios";
import imageCompression from 'browser-image-compression';
import heic2any from "heic2any";

const News = ({user}) => {
    const [comment, setComment] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState({});
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

    const handleFileChange = async (event) => {
        setFile(event.target.files[0]);
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 10,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error("Ошибка при сжатии изображения:", error);
            return file;
        }
    };

    const handleAddNews = () => {
        if (user && user.admin) {
            setShowAddForm(true);
        }
    };

    const handleAddComment = (newsId) => {
        setShowCommentForm({[newsId]: true});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let compressedFile = file;

        if (file && file.name.toLowerCase().endsWith('.heic')) {
            try {
                const blob = await heic2any({
                    blob: file,
                    toType: 'image/png'
                });

                compressedFile = await compressImage(
                    new File([blob], file.name.replace(/\.heic$/i, '.png'), {type: 'image/png'})
                );
            } catch (error) {
                alert("Новость не добавлена, файл охуеть какой огромный");
                return;
            }
        }

        const formData = new FormData();

        formData.append('description', description);
        formData.append('file', compressedFile);
        formData.append('userId', user.id);

        try {
            const response = await axios.post(client.baseUrl + '/api/news/add', formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            if (response.data === "SUCCESS") {
                alert("News added");
                setShowAddForm(false);
                setDescription('');
                setFile(null);
                fetchNewsList();
            } else {
                alert("Failed to add news");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to add news");
        }
    };

    const fetchNewsList = async () => {
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
    };

    const handleCommentChange = (event, newsId) => {
        setComment({...comment, [newsId]: event.target.value});
    };

    const handleCommentSubmit = async (event, newsId) => {
        event.preventDefault();

        const formData = new URLSearchParams();
        formData.append('text', comment[newsId]);
        formData.append('userId', user.id);

        try {
            const response = await axios.post(client.baseUrl + `/api/news/add_comment_${newsId}`, formData);

            if (response.data === "SUCCESS") {
                alert("Comment added");
                fetchNewsList();
            } else {
                alert("Failed to add comment");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to add comment");
        }
    };

    return (
        <div>
            <div className={styles.newsContainer}>
                {newsList.map((newsItem) => (
                    <div className={styles.newsItem} key={newsItem.id}>
                        <img src={client.baseUrl + "/images/" + newsItem.pathToFile} alt="News"
                             className={styles.newsImage}/>
                        <p className={styles.newsDescription}>{newsItem.description}</p>
                        <p className={styles.newsAuthor}>Post by: {newsItem.author.name}</p>
                        <button className={styles.addCommentButton} onClick={() => handleAddComment(newsItem.id)}>Add
                            Comment
                        </button>
                        {showCommentForm[newsItem.id] && (
                            <form onSubmit={(event) => handleCommentSubmit(event, newsItem.id)}>
                    <textarea
                        autoFocus
                        value={comment[newsItem.id]}
                        onChange={(event) => handleCommentChange(event, newsItem.id)}
                        required
                    />
                                <button type="submit">Add Comment</button>
                            </form>
                        )}
                        <div className={styles.commentsContainer}>
                            {newsItem.comments ? (
                                newsItem.comments.map((comment) => (
                                    <div key={comment.id} className={styles.comment}>
                                        <p>{comment.text}</p>
                                        <p>Comment by: {comment.author.name}</p>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>

            {user && user.admin && (
                <button className={styles.addNewsButton} onClick={handleAddNews}>Add News</button>
            )}
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
                            <button type="button" className={styles.modalButton}
                                    onClick={() => setShowAddForm(false)}>Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;
