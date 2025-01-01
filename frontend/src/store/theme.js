import {create} from 'zustand';

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

export const useThemeStore = create((set) => ({
  theme: savedTheme ? savedTheme : (prefersDarkMode ? 'dark' : 'light'),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  })
}));