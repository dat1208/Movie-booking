// utils/localStorage.ts

export const saveToLocalStorage = (key: string, data: any) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getFromLocalStorage = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error('Error retrieving from localStorage:', error);
        return null;
    }
};
