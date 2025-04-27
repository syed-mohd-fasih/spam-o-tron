import create from "zustand";
import axios from "../utils/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,

    signup: async (fullName, username, email, password, confirmPassword) => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/signup", {
                fullName,
                username,
                email,
                password,
                confirmPassword,
            });
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
            set({ user: res.data, loading: false });
            return true;
        } catch (error) {
            console.error("Error signing up:", error.message);
            set({ loading: false });
            return false;
        }
    },

    login: async (username, password) => {
        set({ loading: true });
        try {
            const res = await axios.post("/auth/login", { username, password });
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
            set({ user: res.data, loading: false });
            return true;
        } catch (error) {
            console.error("Error logging in:", error.message);
            set({ loading: false });
            return false;
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            await AsyncStorage.removeItem("user");
            set({ user: null });
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    },
}));
