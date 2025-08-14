import { createContext, useContext } from "react";

export const PiecesContext = createContext(null);

export const usePiecesContext = () => {
	return useContext(PiecesContext);
};
