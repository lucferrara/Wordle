import Tiles from "./Tiles";

export default function Instructions({ show, onClose}: { show: boolean, onClose: any}) {
    return (
        <div> 
            {show && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">How to Play</h2>
                            <button type="button" className="btn-close" onClick={onClose}></button>  
                        </div>
                        <div className="modal-body">
                        <h4>Guess the Worde in 6 tries.</h4>
                        <ul>
                            <li>Each guess must be a valid 5-letter word.</li>
                            <li>The color of the tiles will change to show how close your guess was to the word.</li>
                        </ul>
                        <h6 className="text-bold">Examples</h6>
                        <div>
                            <Tiles values={["W", "O", "R", "D", "Y"]} setValues={null} colors={["Green", "W", "W", "W", "W"]}></Tiles>
                            <p><b>W</b> is in the word and in the correct spot.</p>
                        </div>
                        <div>
                            <Tiles values={["L", "I", "G", "H", "T"]} setValues={null} colors={["W", "Yellow", "W", "W", "W"]}></Tiles>
                            <p><b>I</b> is in the word but in the wrong spot.</p>
                        </div>
                        <div>
                            <Tiles values={["R", "O", "G", "U", "E"]} setValues={null} colors={["W", "W", "W", "Gray", "W"]}></Tiles>
                            <p><b>U</b> is not in the word in any spot.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}