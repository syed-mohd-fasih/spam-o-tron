import { create } from "zustand";
import axios from "../utils/api";

export const useConversationStore = create((set) => ({
    conversations: [],
    loading: false,

    fetchConversations: async () => {
        set({ loading: true });
        try {
            const res = await axios.get("/users");
            set({ conversations: res.data, loading: false });
        } catch (error) {
            console.error("Error fetching conversations:", error.message);
            set({ loading: false });
        }
    },

    clearConversations: () => {
        set({ conversations: [] });
    },
}));
