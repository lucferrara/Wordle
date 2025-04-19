import { useState } from "react"

export default function Tile() {
    const [value, setValue] = useState("");
    
    const handleChange = (c: string) => { 
        const char = c.toUpperCase();
        if (/^[A-Z]$/.test(char) || char === "") {
            setValue(char); 
        } 
    };

    return (
    <input type="text" 
            maxLength={1} className="form-control" 
            style={{width: '60px', height: '60px', textAlign: "center", textTransform: 'uppercase'}}
            value={value}
            onChange={(e) => handleChange(e.target.value)}/>
    )
    
}