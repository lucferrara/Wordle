import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const startGame = async () => {
	const { data } = await axios.get(`${API}/startgame`);
	return data;
}
