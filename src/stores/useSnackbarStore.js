import create from "zustand";

export const useSnackbarStore = create((set) => ({
    snackbarVisible: false,
    snackbarMessage: "",
    showSnackbar: (message) => {
        set({ snackbarMessage: message, snackbarVisible: true });
        setTimeout(() => {
            set({ snackbarVisible: false });
        }, 3000); // Snackbar will hide after 3 seconds
    },
    hideSnackbar: () => set({ snackbarVisible: false }),
}));
