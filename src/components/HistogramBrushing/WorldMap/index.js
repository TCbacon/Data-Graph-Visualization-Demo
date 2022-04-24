import React, {useMemo} from "react";
import {scaleSqrt, max } from "d3";
import {Marks} from "./Marks";

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

export const WorldMap = ({data, filteredData, worldAtlas}) => {

    const sizeScale = useMemo(() => {
        //console.log("sizeScale memo");
        return(
            scaleSqrt()
            .domain([0, max(data, sizeValue)])
            .range([0, maxRadius])
        )
   
    }, [data, sizeValue, maxRadius]);

    return (
        <Marks worldAtlas={worldAtlas} filteredData={filteredData} sizeScale={sizeScale} sizeValue={sizeValue}/>
    )
}