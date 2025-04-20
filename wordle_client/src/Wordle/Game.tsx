import { useEffect, useRef, useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";
import * as client from "./client.ts";
import VictoryScreen from "./VictoryScreen.tsx";
import Keyboard from "./Keyboard.tsx";

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

    const [keyboardColors, setKeyboardColors] = useState(
        Object.fromEntries("abcdefghijklmnopqrstuvwxyz".split("").map(l => [l, ""]))
    );

    const colorPriority: Record<string, number> = {
        "": 0,
        "Gray": 1,
        "Yellow": 2,
        "Green": 3
    };
    
    const updateKeyColor = (letter: string, color: string) => {
        setKeyboardColors(prev => {
            if (colorPriority[color] > colorPriority[prev[letter]]) {
                return { ...prev, [letter]: color };
            }
            return prev; 
        });
    };

    const onKeyClick = (letter: string) => {
        const newWord = [...words[guessNum]];
        for (let i = 0; i < 5; i++) {
            if (newWord[i] === "") {
                newWord[i] = letter;
                break;
            }
        }
    
        setWordAt(guessNum, newWord);
    };

    const onDelete = () => {
        const newWord = [...words[guessNum]];
        for (let i = 4; i >= 0 ; i--) {
            if (newWord[i] !== "") {
                newWord[i] = "";
                break;
            }
        }
    
        setWordAt(guessNum, newWord);
    };

    const wordsRef = useRef(words);
    wordsRef.current = words; 
    
    const gameIdRef = useRef(gameId);
    gameIdRef.current = gameId;

    const guessNumRef = useRef(guessNum);
    guessNumRef.current = guessNum;

    const colorsRef = useRef(colors);
    colorsRef.current = colors; 

    const keyboardColorsRef = useRef(keyboardColors);
    keyboardColorsRef.current = keyboardColors;
    
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

    const onEnter = async () => {
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
            if(feedback[i] === "Green") {
                green_count = green_count + 1;
                
            }
        }
        setColorAt(guessNumRef.current, feedback.slice(0, 5));
        setGuessNum(guessNumRef.current + 1);
        for (let i = 0 ; i < 5 ; i++)
        {
            const letter = currentGuess[i];
            const color = feedback[i];
            updateKeyColor(letter, color);
        }

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
    
    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                await onEnter(); 
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [gameId]);

    return (
        <div className="d-flex flex-column align-items-center text-center">
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
            <VictoryScreen word={winningWord} numGuesses={guessNumRef.current}
                            show={done} playAgain={() => playAgain()} />
            {gameId !== -1 && words.map((word, i) => (
                <div className="mb-4 d-flex justify-content-center" key={i}>
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
            {gameId !== -1 && <Keyboard keyboardColors={keyboardColorsRef.current} onKeyClick={onKeyClick} onEnter={onEnter} onDelete={onDelete}/>}
            
            {!gameId && <h6>Loading...</h6>}
            
        </div>
    )
}