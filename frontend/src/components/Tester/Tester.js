import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useSubscribe} from "./../../hooks/hooks.ts";
import axios from "axios";
import toast from 'react-hot-toast';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Tester = () => {
    const [loadingSubscribe, setLoadingSubscribe] = useState(false)
    const [loadingPush, setLoadingPush] = useState(false)
    const [pushId, setPushId] = useState('');
    const [message, setMessage] = useState('World');
    const [title, setTitle] = useState('Hello');
    const [subscribeId, setSubscribeId] = useState('');
    const [showSubscribe, setShowSubscribe] = useState(true)

    const onShowSubscribe = () => {
        setShowSubscribe(true)
    }
    const onShowPush = () => {
        setShowSubscribe(false)
    }

    const PUBLIC_KEY = "BE2FvJH3DfNGUwUw2dVZ5b9P2Lk79f2BK0T3WP0pXMUgtwX_aNfP3rAzcya326eKv429Lbm0Ik9CDfoRgK6WDao";
    const {getSubscription} = useSubscribe({publicKey: PUBLIC_KEY});

    const onSubmitSubscribe = useCallback(async (e: React.FormEvent) => {
        console.log("pressed");
        e.preventDefault();
        setLoadingSubscribe(true)
        try {
            const subscription = await getSubscription();
            console.log("===== sent sub: \n" + subscription + "\n=====\n")
            await axios.post('http://5.101.51.223:3002/subscribe', {
                subscription: subscription,
                id: subscribeId
            })
            toast.success('Subscribe success');
        } catch (e) {
            console.warn(e);
            toast.error('Details console');
        } finally {
            setLoadingSubscribe(false)
        }
    }, [getSubscription]);

    const onSubmitPush = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingPush(true)
        try {
            await axios.post('http://5.101.51.223:3002/send', {
                message,
                title,
                id: pushId
            })
            toast.success('Push success');
        } catch (e) {
            toast.error('Details console');
        } finally {
            setLoadingPush(false)
        }
    }, [pushId, message, title]);

    const onChange = useCallback((setState: React.Dispatch<React.SetStateAction>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }, []);

    useEffect(() => {
        FingerprintJS.load()
            .then(fp => fp.get())
            .then(result => {
                setSubscribeId(result.visitorId)
                setPushId(result.visitorId)
            });
    }, []);


    return (
        <div className="App">
            <main>
                <div>

                </div>
                <div className="tabs">
                    <div className={`tab-item`}>
                        <button className={`tab ${showSubscribe ? 'active' : ''}`} onClick={onShowSubscribe}>Subscribe
                        </button>
                    </div>
                    <div className={`tab-item`}>
                        <button className={`tab ${!showSubscribe ? 'active' : ''}`} onClick={onShowPush}>Push</button>
                    </div>
                </div>
                {!showSubscribe && <div className="send">
                    <form onSubmit={onSubmitPush}>
                        <div className="title">Notification</div>
                        <input id="idSubscribe" placeholder="id" value={pushId}
                               onChange={onChange(setPushId)}/>
                        <input id="title" placeholder="title" value={title} onChange={onChange(setTitle)}/>
                        <input id="message" placeholder="message" value={message} onChange={onChange(setMessage)}/>
                        <button className={loadingPush ? 'loading' : ''} type="submit">Send</button>
                    </form>
                </div>}
                {showSubscribe && <div className="send">
                    <form onSubmit={onSubmitSubscribe}>
                        <div className="title">Your Id</div>
                        <input id="fingerprint" placeholder="Your id" value={subscribeId}
                               onChange={onChange(setSubscribeId)}/>
                        <button className={loadingSubscribe ? 'loading' : ''} type="submit">Send</button>
                    </form>
                </div>}
            </main>
        </div>
    );
};

export default Tester;
