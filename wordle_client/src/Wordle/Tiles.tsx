import Tile from "./Tile";

export default function Tiles({values, setValues, colors}: {values: any, setValues: any, colors: any}) {
    return (
        <div className="row">
            {values.map((value: string, index: number) => (
                <div className="col-2" key={index}>
                    <Tile value={value} values={values} setValues={setValues} index={index} color={colors[index]}/>
                </div>
            ))}
        </div>
    )
}