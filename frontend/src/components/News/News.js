import React, {useEffect, useState} from 'react';

import './News.css';
import * as storage from "../../data/storage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Modal from "../Modal/Modal";
import heic2any from "heic2any";
import * as updater from "../../data/updater";
import * as imageCompresser from "../../utils/imageCompresser";
import AbstractBox from "../AbstractBox/AbstractBox";
import * as constants from "../../constants/constants";
import {Button} from "react-bootstrap";
import {IoAddOutline, IoArrowBackSharp} from "react-icons/io5";
import {format} from "date-fns";

const News = ({user}) => {
    const [news, setNews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        storage.getNews().then(
            newsJson => {
                setNews(newsJson.reverse())
            }
        );
    }, []);

    const mappedNews = news.map((newsItem, idx) => (
        <div className="newsItem" key={idx}>
            <AbstractBox
                title={
                    <div className="messageBoxHeader">
                        <img src={`/avatars/${newsItem.author.login}.JPG`} alt="Avatar" className="avatar"/>
                        <div className="authorName">
                            By: {newsItem.author.name}
                        </div>
                    </div>
                }
                body={
                    <div className="newsContent">
                        <img src={constants.BACKEND_JAVA_URL + "/images/" + newsItem.pathToFile} alt="News"
                             className="newsImage"/>
                        <div>{newsItem.description}</div>
                    </div>
                }
                footer={
                    format(newsItem.creationTime, 'PPPP')
                }
            />
        </div>
    ));

    const addNews = () => {
        let compressedFile = file;

        if (file && file.name.toLowerCase().endsWith('.heic')) {
            const blob = heic2any({
                blob: file,
                toType: 'image/png'
            });

            compressedFile = imageCompresser.compressImage(
                new File([blob], file.name.replace(/\.heic$/i, '.png'),
                    {type: 'image/png'})
            );
        }

        const data = new FormData();

        data.append('description', description);
        data.append('file', compressedFile);
        data.append('userId', user.id);

        updater.addNews(data);

        setShowModal(false);
        alert('News added');
        setFile(null);
        window.location.reload();
    };

    return (
        user ?
            <div>
                <h3 className="pageHeader">News</h3>
                <div className="containerHeader">
                    <Button className="commonStopListButton animatedButton backButton" href={'/'}>
                        <IoArrowBackSharp/>
                    </Button>
                    {user.admin &&
                    <Button className="commonStopListButton animatedButton addButton"
                            onClick={() => setShowModal(true)}>
                        <IoAddOutline/>
                    </Button>
                    }
                </div>
                <div className="newsContainer">
                    {mappedNews}
                    <Modal
                        isOpen={showModal}
                        onClose={() => {
                            setShowModal(false);
                            setDescription('');
                        }}>
                        <h2>Add News</h2>
                        <form onSubmit={addNews}>
                            <label>Description:</label>
                            <textarea
                                maxLength={250}
                                style={{outline: 'none'}}
                                autoFocus
                                value={description}
                                onChange={(textArea) => setDescription(textArea.target.value)}
                                required
                            />
                            <label>File:</label>
                            <input
                                type="file"
                                onChange={(file) => setFile(file.target.files[0])}
                                accept="image/*"
                                required
                            />
                            <button type="submit">Add</button>
                        </form>
                    </Modal>
                </div>
            </div>
            :
            <NotFoundPage/>
    );
};

export default News;
