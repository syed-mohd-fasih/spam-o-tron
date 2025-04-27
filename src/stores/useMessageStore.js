import { create } from "zustand";
import axios from "../utils/api";

export const useMessageStore = create((set) => ({
    messages: [],
    loading: false,

    fetchMessages: async (otherUserId) => {
        try {
            set({ loading: true });
            const res = await axios.get(`/messages/${otherUserId}`);
            set({ messages: res.data, loading: false });
        } catch (error) {
            console.error("Error fetching messages:", error);
            set({ loading: false });
        }
    },

    sendMessage: async (otherUserId, text) => {
        try {
            const res = await axios.post(`/messages/send/${otherUserId}`, {
                message: text,
            });

            // Push the new message to messages array
            set((state) => ({
                messages: [...state.messages, res.data],
            }));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },

    clearMessages: () => set({ messages: [] }),
}));
