import { useEffect, useRef, useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";
import * as client from "./client.ts";

export default function Game() {
    let [gameId, setGameId] = useState(-1);
    const startGame = async () => {
        const id = await client.startGame(); 
        setGameId(id.gameId)
    }

    const [showInstructions, setShowInstructions] = useState(true);

    const [words, setWords] = useState(Array(6).fill(null).map(() => ["", "", "", "", ""]));
    const [colors, setColors] = useState(Array(6).fill(null).map(() => ["", "", "", "", ""]));
    const [guessNum, setGuessNum] = useState(0);

    const wordsRef = useRef(words);
    wordsRef.current = words; // Update the ref value every time words change
    
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

    const handleKeyDown = async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            console.log(guessNum)
            const currentGuess = wordsRef.current[guessNumRef.current].join("").toLowerCase().trim(); 
            
            if (currentGuess.length !== 5) return;

            const feedback = await client.sendGuess(gameId, currentGuess);
            console.log(feedback);
            setColorAt(guessNumRef.current, feedback)
            setGuessNum(guessNumRef.current + 1);
        }
    }
    
    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (gameId !== -1)
        { 
            window.addEventListener("keydown", handleKeyDown);
        }
        else {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [gameId]);

    return (
        <div>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
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