import { useState } from "react";
import Instructions from "./Instructions";
import Tiles from "./Tiles";

export default function Game() {
    const [showInstructions, setShowInstructions] = useState(true);
    return (
        <div>
            <Instructions show={showInstructions} onClose={() => setShowInstructions(false)} />
            <Tiles />
            <Tiles />
            <Tiles />
            <Tiles />
            <Tiles />
            <Tiles />
            
        </div>
    )
}