import { useEffect, useRef, useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";
import * as client from "./client.ts";
import VictoryScreen from "./VictoryScreen.tsx";

export default function Game() {
    let [gameId, setGameId] = useState(-1);
    const [winningWord, setWinningWord] = useState("");
    const startGame = async () => {
        const id = await client.startGame(); 
        setGameId(id.gameId)
        setDone(false);
    }

    const initWords = Array(6).fill(null).map(() => ["", "", "", "", ""]);
    const initColors = Array(6).fill(null).map(() => ["", "", "", "", ""]);
    const [showInstructions, setShowInstructions] = useState(true);
    const [done, setDone] = useState(false);
    const [words, setWords] = useState(initWords);
    const [colors, setColors] = useState(initColors);
    const [guessNum, setGuessNum] = useState(0);

    const wordsRef = useRef(words);
    wordsRef.current = words; 
    
    const gameIdRef = useRef(gameId);
    gameIdRef.current = gameId;

    const guessNumRef = useRef(guessNum);
    guessNumRef.current = guessNum;

    const colorsRef = useRef(colors);
    colorsRef.current = colors; 

    
    const setWordAt = (index: number, newWord: string[]) => {
        const updated = [...words];
        updated[index] = newWord;
        setWords(updated); 
    }

    const setColorAt = (index: number, newColors: string[]) => {
        const updated = [...colorsRef.current];
        updated[index] = newColors;
        setColors(updated); 
    }
    
    const playAgain = async () => {
        await startGame(); 
        setWords(initWords);
        setColors(initColors);
        setGuessNum(0);
    };
    
    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                const currentGuess = wordsRef.current[guessNumRef.current].join("").toLowerCase().trim(); 
                
                if (currentGuess.length !== 5) return;
    
                const feedback = await client.sendGuess(gameIdRef.current, currentGuess);
                if (feedback === "INVALID GUESS")
                {
                    return;
                }
                let green_count = 0;
                for(let i=0 ; i<5 ; i++)
                {
                    if(feedback[i] === "Green") green_count = green_count + 1;
                }
                setColorAt(guessNumRef.current, feedback.slice(0, 5));
                setGuessNum(guessNumRef.current + 1);
    
                if (green_count === 5) {
                    setDone(true);
                    setWinningWord(currentGuess);
                }
    
                if (feedback.length > 5)
                {
                    setGuessNum(guessNumRef.current + 2)
                    setDone(true);
                    setWinningWord(feedback[5]);
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [gameId]);

    return (
        <div>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
            <VictoryScreen word={winningWord} numGuesses={guessNumRef.current}
                            show={done} playAgain={() => playAgain()} />
            {gameId != -1 && words.map((word, i) => (
                <div className="mb-2" key={i}>
                    {i <= guessNum && <Tiles
                            values={word}
                            setValues={(newWord: string[]) => setWordAt(i, newWord)}
                            colors={colors[i]}
                    />}
                    {i > guessNum && <Tiles
                        values={word}
                        setValues={(newWord: string[]) => setWordAt(i, newWord)}
                        colors={["W", "W", "W", "W", "W"]}
                    />}    
                </div>
            ))}
            {!gameId && <h6>Loading...</h6>}
            
        </div>
    )
}