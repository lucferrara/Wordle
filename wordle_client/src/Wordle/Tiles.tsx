import Tile from "./Tile";

export default function Tiles({values, setValues}: {values: any, setValues: any}) {
    return (
        <div className="row mb-4">
            {values.map((value: string, index: number) => (
                <div className="col" key={index}>
                    <Tile value={value} values={values} setValues={setValues} index={index} />
                </div>
            ))}
        </div>
    )
}