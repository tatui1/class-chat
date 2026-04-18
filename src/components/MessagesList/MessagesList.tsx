import {useEffect, useState} from 'react'
import type {ApiMessage, IMessageFull} from '../../types.ts'
import {axiosApi} from '../../axiosApi.ts'
import { Card, CardContent, Typography, Box, IconButton, Badge } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './styles.module.css'

export const MessagesList = () => {
    const [messages, setMessages] = useState<IMessageFull[]>([]);
    const likeMessage = async (msg: IMessageFull) => {
        const updatedLikes = (msg.likes || 0) + 1;
        await axiosApi.put(`/messages/${msg.id}.json`, {
            ...msg,
            likes: updatedLikes
        })
    }

    useEffect(() => {
        const getMessages = async() => {
            try {
                const response = await axiosApi<ApiMessage>('/messages.json');
                const data = response.data;

                if (!data) return;

                const newMessages: IMessageFull[] = Object.keys(data).map(key => {
                    const newMessage = data[key];
                    return {
                        ...newMessage,
                        id: key, 
                    }
                })
                setMessages(newMessages);
            } catch (e) {
                console.log(e);
            }
        }

        getMessages()

        const interval = setInterval(getMessages, 30000)
        return () => clearInterval(interval)
    }, [])
    
    return (
        <div className={styles.container}>
            {messages.map(message => (
                <Card key={message.id} variant="outlined" sx={{ mb: 2, borderRadius: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">author: {message.author}</Typography>
                        <Typography variant="body1">{message.message}</Typography>
                        <Box sx={{ mt: 1 }}>
                            <IconButton onClick={() => likeMessage(message)} color="error">
                                <Badge badgeContent={message.likes || 0} color="primary">
                                    <FavoriteIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}