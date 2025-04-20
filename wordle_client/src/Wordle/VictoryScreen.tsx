export default function VictoryScreen({ word, numGuesses, show, playAgain,}: { word: string, numGuesses: number, show: boolean, playAgain: any}) {
    return (
        <div> 
            {show && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center text-center">
                            {numGuesses === 1 && <h3 className="modal-title text-success">Correct! You guessed <b>{word}</b> in {numGuesses} attempt!</h3>}
                            {numGuesses > 1 && numGuesses <= 6 && <h3 className="modal-title text-success">Correct! You guessed {word} in {numGuesses} attempts!</h3>}
                            {numGuesses > 6 && <h3 className="modal-title text-danger">Better luck next time! The correct word was: {word}.</h3>}
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column align-items-center">
                                <button className="btn btn-success mb-2" onClick={playAgain}>Play Again</button>
                                <a href="#/">
                                    <button className="btn btn-danger">Quit</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}