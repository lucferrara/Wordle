export default function Start() {
    return (
        <div className="container">
            <div className="text-center">
                <img src="wordle-logo.png" />
            </div>
            <div className="text-center mt-2 mb-4">
                <h1>Wordle</h1>
                <h3>Get 6 chances to guess a 5-letter word.</h3>
            </div>
            <div className="text-center pt-4 mt-4">
                <button className="btn btn-success">Start</button>
            </div>
        </div>
    );
}
