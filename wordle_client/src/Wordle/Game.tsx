import { useState } from "react";
import Instructions from "./Instructions";

export default function Game() {
    const [showInstructions, setShowInstructions] = useState(true);
    return (
        <div>
            <h1>Wordle</h1>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
        </div>
    )
}