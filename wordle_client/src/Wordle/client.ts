import axios from "axios";

const API = "https://api.lucferrara.com";

export const startGame = async () => {
	const { data } = await axios.get(`${API}/startgame`);
	return data;
}

export const sendGuess = async (gameId: Number, guess: string) => {
	const { data } = await axios.post(`${API}/sendguess/${gameId}/${guess}`);
	return data;
}
