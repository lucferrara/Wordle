import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getRandomWord = async () => {
	const { data } = await axios.get(`${API}/randomword`);
	return data;
}
