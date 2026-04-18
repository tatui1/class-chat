import {create} from 'zustand'
import type {IMessageFull, IMessage, ApiMessage} from './types.ts';
import {axiosApi} from './axiosApi.ts';

interface ChatStore {
  messages: IMessageFull[]
  setMessages(messages: IMessageFull[]): void
  fetchMessages (): void
  addMessage (message: IMessage): void
  likeMessage (msg: IMessageFull): void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  setMessages: (messages) => set({messages: messages}),
  fetchMessages: async () => {
    const response = await axiosApi.get<ApiMessage>('/messages.json');
    if (response.data) {
      const newMessages = Object.keys(response.data).map(key => ({
        ...response.data[key],
        id: key,
      }))
      set({ messages: newMessages.reverse() })
    }
  },

  addMessage: async (message) => {
    await axiosApi.post('/messages.json', message)
    await get().fetchMessages()
  },

  likeMessage: async (msg) => {
    const updatedLikes = (msg.likes || 0) + 1;
    await axiosApi.put(`/messages/${msg.id}.json`, {
      author: msg.author,
      message: msg.message,
      likes: updatedLikes
    })
    await get().fetchMessages()
  }
}))