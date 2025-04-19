import { IoIosClose } from "react-icons/io";

export default function Instructions() {
    return (
        <div className="container">
            <div className="row justify-content-right text-right">
                <IoIosClose />
            </div>
            <div className="container">
                <h1>How To Play</h1>
                <h3>Guess the Worde in 6 tries.</h3>
                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>The color of the tiles will change to show how close your guess was to the word.</li>
                </ul>
                <h6 className="text-bold">Examples</h6>
            </div>     
        </div>
    )
}