import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://localhost:3000";

export const temp = async () => {
	const { data } = await axios.get(`${API}/`);
	return data;
}
