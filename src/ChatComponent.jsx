import React, { useEffect, useState } from 'react';
import './ChatComponent.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircleRounded';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';

const ChatComponent = () => {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [ input, setInput ] = useState("")
    const [messages, setMessages ] = useState([])

    useEffect ( () => {
        if (channelId) {
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot ( (snapshot) => {
                setMessages(snapshot.docs.map ( (doc) => doc.data()           
                ))
            })
        }  
    } , [channelId])

    const sendMessage = (e) => {
        e.preventDefault();
        
        db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    
        setInput("")
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map( (message) => 
                    <Message 
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                    />
                )}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form >
                    <input value={input} onChange={ (e) => setInput(e.target.value)}
                    disables={!channelId}
                    
                    placeholder={` Type your message on ${channelName}` }/>
                    <button className="chat__inputButton" type="submit" onClick={sendMessage}>Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
            
        </div>
    )
}

export default ChatComponent
