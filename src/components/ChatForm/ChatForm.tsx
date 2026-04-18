import { useState, type FormEvent,  } from 'react';
import { TextField, Button, Paper, Stack } from '@mui/material';
import { useChatStore } from '../../ChatStore';

export const ChatForm = () => {
    const addMessage = useChatStore(state => state.addMessage)
    const [form, setForm] = useState({ author: '', message: '' })

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (form.author.trim() && form.message.trim()) {
            await addMessage(form)
            setForm({ ...form, message: '' })
        }
    }

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Stack component="form" onSubmit={onSubmit} spacing={2}>
                <TextField label="Author" variant="outlined" fullWidth 
                    value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
                <TextField label="Message" variant="outlined" fullWidth multiline rows={2}
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                <Button type="submit" variant="contained">Send</Button>
            </Stack>
        </Paper>
    )
}