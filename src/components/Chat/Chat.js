import React, {useEffect, useState} from 'react';
import "./Chat.css"
import ChatHeader from "../ChatHeader/ChatHeader";
import { AddCircle, CardGiftcard, Gif, EmojiEmotions } from "@material-ui/icons"
import Message from "../Message/Message";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {selectChannelId, selectChannelName} from "../../features/appSlice";
import {db} from "../../firebase/firebase";
import firebase from "firebase";

const Chat = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [ input, setInput ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useEffect( () => {
        if (channelId) {
            db.collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp','desc')
                .onSnapshot( snapshot =>
                    setMessages(snapshot.docs.map( doc => doc.data() )))
        }

    }, [channelId] );

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .add({
                message: input,
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

        setInput('');
    }

    return (
        <div className='chat'>
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {
                    !!messages.length && messages.map( ({ message, user, timestamp}) => (
                        <Message
                            message={message}
                            user={user}
                            timestamp={timestamp}
                        />
                    ) )
                }
                <Message />
            </div>
            <div className="chat__input">
                <AddCircle fontSize='large' />
                <form>
                    <input
                        value={input}
                        onChange={ e => setInput(e.target.value) }
                        disabled={!channelId}
                        placeholder={`Message ${channelName}`}
                    />
                    <button
                        disabled={!channelId}
                        className="chat__inputButton"
                        type='submit'
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcard fontSize='large' />
                    <Gif fontSize='large' />
                    <EmojiEmotions fontSize='large' />
                </div>
            </div>
        </div>
    );
};

export default Chat;
