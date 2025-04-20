export default function Keyboard({keyboardColors, onKeyClick, onEnter, onDelete}: {keyboardColors: any, onKeyClick: any, onEnter: any, onDelete: any}) {
    const rows = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"]
    ];

    const colorClass = (color: string) => {
        switch (color) {
            case "Green":
                return "btn-success";
            case "Yellow":
                return "btn-warning";
            case "Gray":
                return "btn-secondary";
            default:
                return "btn-light";
        }
    };
    
    console.log(keyboardColors);
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            {rows.map((row, rowIndex) => (
                <div className="d-flex justify-content-center mb-2" key={rowIndex}>
                    {row.map(letter => (
                        <button
                            key={letter}
                            className={`btn ${colorClass(keyboardColors[letter])} mx-1`}
                            style={{ width: '40px', height: '40px' }}
                            onClick={() => onKeyClick(letter)}
                        >
                            {letter.toUpperCase()}
                        </button>
                    ))}
                </div>
            ))}
            <div className="d-flex justify-content-center mb-2"> 
                <button className="btn btn-light mx-1" style={{width:'80px', height:'40px'}} onClick={onEnter}>Enter</button>
                <button className="btn btn-light mx-1" style={{width:'80px', height:'40px'}} onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}