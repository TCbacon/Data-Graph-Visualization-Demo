import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import { useMemo } from 'react';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
    worldAtlas: { land, interiors },
    filteredData,
    sizeScale,
    sizeValue
}) => {

    return (
        <g className="marks">
            {useMemo(() => {
                //console.log("worldmap marks memo");
                return (
                    <>

                        <path className="sphere" d={path({ type: "Sphere" })} />
                        <path className="gradicule" d={path(graticule())} />
                        {land.features.map((feature, idx) => {
                            return (
                                <path key={idx} className="land" d={path(feature)} />
                            )
                        })}
                        <path className="interiors" d={path(interiors)} />

                    </>
                )
            }, [graticule, land, interiors, path])}

            {filteredData.map((d, idx) => {
                const [x, y] = projection(d.coords);
                return <circle key={idx} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
            })}
        </g>)

}