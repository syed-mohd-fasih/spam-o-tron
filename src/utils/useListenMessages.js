import { useEffect } from "react";

import { useMessageStore } from "../stores/useMessageStore";
import { useSocketContext } from "../context/SocketContext";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { addMessage } = useMessageStore();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            addMessage(newMessage);
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [socket]);
};

export default useListenMessages;
