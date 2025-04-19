import { useState } from "react";
import Tile from "./Tile";

export default function Tiles() {
    let [values, setValues] = useState(["", "", "", "", ""])
    return (
        <div className="row mb-4">
            {values.map((value, index) => (
                <div className="col" key={index}>
                    <Tile value={value} values={values} setValues={setValues} index={index} />
                </div>
            ))}
        </div>
    )
}