import create from "zustand";

export const useOSCStore = create(set => ({
    formResponse: {},
    setFormResponse: objFormResponse =>
        set(() => ({
            formResponse: objFormResponse,
        })),
}));
