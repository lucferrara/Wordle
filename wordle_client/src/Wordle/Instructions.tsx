import Tiles from "./Tiles";

export default function Instructions({ show, onClose}: { show: boolean, onClose: any}) {
    return (
        <div> 
            {show && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark">
                        <div className="modal-header justify-content-center">
                            <h2 className="modal-title text-light">How to Play</h2>
                        </div>
                        <div className="modal-body text-light justify-content-center text-center">
                            <h4>Guess the Worde in 6 tries.</h4>
                            <li>Each guess must be a valid 5-letter word.</li>
                            <li>The color of the tiles will change to show how close your guess was to the word.</li>
                            <h6 className="text-bold text-light mt-4 ">Examples</h6>
                            <div className="d-flex justify-content-center ms-4 ps-4 mb-2">
                                <Tiles values={["W", "O", "R", "D", "Y"]} setValues={null} colors={["Green", "W", "W", "W", "W"]}></Tiles>
                            </div>
                                <p><b>W</b> is in the word and in the correct spot.</p>
                            <div className="d-flex justify-content-center ms-4 ps-4 mb-2">
                                <Tiles values={["L", "I", "G", "H", "T"]} setValues={null} colors={["W", "Yellow", "W", "W", "W"]}></Tiles>
                            </div>
                            <p><b>I</b> is in the word but in the wrong spot.</p>
                            <div className="d-flex justify-content-center ms-4 ps-4 mb-2">
                                <Tiles values={["R", "O", "G", "U", "E"]} setValues={null} colors={["W", "W", "W", "Gray", "W"]}></Tiles>
                            </div>
                            <p><b>U</b> is not in the word in any spot.</p>
                        </div>
                        <div className="modal-footer text-light justify-content-center">
                            <button type="button" className="btn btn-success" onClick={onClose}>Begin</button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    )
}