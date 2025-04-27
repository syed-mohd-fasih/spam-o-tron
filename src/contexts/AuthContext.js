import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const signup = async (
        fullName,
        email,
        username,
        password,
        confirmPassword
    ) => {
        try {
            const res = await axios.post("/auth/signup", {
                fullName,
                email,
                username,
                password,
                confirmPassword,
            });

            const data = await res.data;

            if (data.error) {
                throw new Error(data.error);
            }

            await AsyncStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
        } catch (error) {
            alert("Error", error.response.data.message);
        }
    };

    const login = async (username, password) => {
        try {
            const res = await axios.post("/auth/login", { username, password });

            const data = await res.data;

            if (data.error) {
                throw new Error(data.error);
            }

            await AsyncStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
        } catch (error) {
            alert("Error", error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout");
            await AsyncStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            alert("Error", error.response.data.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
