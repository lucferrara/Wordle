import { useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";

export default function Game() {
    const [showInstructions, setShowInstructions] = useState(true);

    const [words, setWords] = useState(Array(6).fill(null).map(() => ["", "", "", "", ""]));
    const [colors, setColors] = useState(Array(6).fill(null).map(() => ["", "", "", "", ""]));

    const setWordAt = (index: number, newWord: string[]) => {
        const updated = [...words];
        updated[index] = newWord;
        setWords(updated); 
    }

    const setColorAt = (index: number, newColors: string[]) => {
        const updated = [...colors];
        updated[index] = newColors;
        setColors(updated); 
    }
    return (
        <div>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
            {words.map((word, i) => (
                <div className="mb-2" key={i}>
                <Tiles
                    values={word}
                    setValues={(newWord: string[]) => setWordAt(i, newWord)}
                    colors={colors[i]}
                />
                </div>
            ))}
            
        </div>
    )
}