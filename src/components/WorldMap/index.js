import React, { useState, useEffect } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule, json } from "d3";
import { feature, mesh } from "topojson-client";
import "./styles.css";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const width = 960;
const height = 500;

export const WorldMap = () => {

    const [data, setData] = useState(null);
    const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

    useEffect(() => {
        json(jsonUrl).then(topology => {
            const { countries, land } = topology.objects;
            setData(
                {
                    land: feature(topology, land),
                    interiors: mesh(topology, countries, (a, b) => a != b)
                })
        });
    }, []);

    if (!data) {
        return null;
    }

    const title = "World Map";

    return (
        <>
            <h1>{title}</h1>
            <svg width={width} height={height}>
                <g>
                    <path className="gradicule" d={path(graticule())} />
                    {data.land.features.map((feature, idx) => {
                        return (
                            <path key={idx} className="land" d={path(feature)} />
                        )
                    })
                    }
                </g>
            </svg>
        </>
    );
}