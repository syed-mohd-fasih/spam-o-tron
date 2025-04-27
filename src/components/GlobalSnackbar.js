import React from "react";
import { Snackbar } from "react-native-paper";

import { useSnackbarStore } from "../stores/useSnackbarStore";

const GlobalSnackbar = () => {
    const { snackbarVisible, snackbarMessage, hideSnackbar } =
        useSnackbarStore();

    return (
        <Snackbar
            visible={snackbarVisible}
            onDismiss={hideSnackbar}
            duration={3000} // Set duration for Snackbar visibility
        >
            {snackbarMessage}
        </Snackbar>
    );
};

export default GlobalSnackbar;
