import { useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";

export default function Game() {
    const [showInstructions, setShowInstructions] = useState(true);
    const [word1, setWord1] = useState(["", "", "", "", ""])
    const [word2, setWord2] = useState(["", "", "", "", ""])
    const [word3, setWord3] = useState(["", "", "", "", ""])
    const [word4, setWord4] = useState(["", "", "", "", ""])
    const [word5, setWord5] = useState(["", "", "", "", ""])
    const [word6, setWord6] = useState(["", "", "", "", ""])
    return (
        <div>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
            <Tiles values={word1} setValues={setWord1}/>
            <Tiles values={word2} setValues={setWord2}/>
            <Tiles values={word3} setValues={setWord3}/>
            <Tiles values={word4} setValues={setWord4}/>
            <Tiles values={word5} setValues={setWord5}/>
            <Tiles values={word6} setValues={setWord6}/>
            
        </div>
    )
}