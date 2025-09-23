
export default function Start() {
    return (
        <div className="container">
            <div className="text-center">
                <img src="wordle-logo.png" />
            </div>
            <div className="text-center text-light mt-2 mb-4">
                <h1>Wordle</h1>
                <h3>Get 6 chances to guess a 5-letter word.</h3>
            </div>
            <div className="text-center text-light pt-4 mt-4">
                <a href="#/play" className="nav-link d-inline-block" style={{ width: "150px" }}>
                    <button className="btn btn-success w-50">Play</button>
                </a>
                </div>
                <div className="text-center text-light pt-4">
                <a href="https://lucferrara.com/#/" className="nav-link d-inline-block" style={{ width: "150px" }}>
                    <button className="btn btn-secondary w-50">Back</button>
                </a>
            </div>
        </div>
    );
}
