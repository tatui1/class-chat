import { Container, Typography } from "@mui/material";
import { MessagesList } from "../../components/MessagesList/MessagesList";
import { ChatForm } from "../../components/ChatForm/ChatForm";

export const Chat = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 4}}>
            <Typography variant="h4" align="center" gutterBottom>Chat Compass</Typography>
            <ChatForm />
            <MessagesList />
        </Container>
    )
}