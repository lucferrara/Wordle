export default function Tile({value, values, setValues, index, color}: {value: string, values: string[], setValues: any, index: number, color: string}) {    
    const handleChange = (c: string) => { 
        const char = c.toUpperCase();
        if (/^[A-Z]$/.test(char) || char === "") {
            const newValues = [...values]
            newValues[index] = char
            setValues(newValues)
        } 
    };

    return (
    <input type="text" 
            maxLength={1} className={`form-control 
                                    ${color == "Green" ? "bg-success" : ""}
                                    ${color == "Yellow" ? "bg-warning" : ""}
                                    ${color == "Gray" ? "bg-secondary" : ""}
                                    ${color == "W" ? "bg-light" : ""}`}
            style={{width: '60px', height: '60px', textAlign: "center", textTransform: 'uppercase'}}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={color ? true : false}/>
    )
    
}