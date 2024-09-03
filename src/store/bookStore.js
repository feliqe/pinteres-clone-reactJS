import { create } from 'zustand'

export const useBookStore = create((set) => ({
    // palabra a buscar al inicio
    value: 'dog golden',
    // al buscar seteamos la nueva palabra al value, para la busqueda
    updateValue: (newValue) => set({ value: newValue })
}))