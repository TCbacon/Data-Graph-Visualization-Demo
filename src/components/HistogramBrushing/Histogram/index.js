import React, { useEffect, useState, useRef, useMemo} from 'react';
import { Marks } from './Marks';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import {
    scaleLinear,
    max,
    min,
    timeMonths,
    sum,
    bin,
    timeFormat,
    brushX,
    select
} from 'd3';

const margin = { top: 20, right: 40, bottom: 65, left: 90 };
const yValue = d => d['Total Dead and Missing'];
const xAxisTickFormat = timeFormat('%m/%d/%Y'); //convert seconds into date
const xAxisLabel = 'Time';
const yAxisLabel = 'Total Dead and Missing';
const xLabelOffset = 50;
const yLabelOffset = 50;

export const Histogram = ({ width = 1030, height = 900, data, xValue, setBrushExtent }) => {

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = useMemo(() => {
        //console.log("xscale memo");
        return(
        scaleLinear()
        .domain([min(data, xValue), max(data, xValue)])
        .range([0, innerWidth])
        .nice()
        )
    }, [data, xValue, innerWidth]);


    const [start, stop] = xScale.domain();

    let binData = useMemo(() => {
        //console.log("bin data memo");
        return(
        bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))(data)
        .map(array => ({
            y: sum(array, yValue),
            x0: array.x0,
            x1: array.x1,
        })
    ))
    }, [xValue, yValue, xScale, data]);

    const yScale = useMemo(() => {
        //console.log("yScale memo");
        return scaleLinear()
        .domain([0, max(binData, d => d.y)])
        .range([innerHeight, 0])
    }, [innerHeight, binData]);

    const brushRef = useRef();

    const brushed = ({selection}) => {
        setBrushExtent(selection && selection.map(d => 
            xScale.invert(d)
        ));
    }

    useEffect(() => {
        const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
        brush(select(brushRef.current));
        brush.on('brush end', brushed);
    }, [innerWidth, innerHeight]);

    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <text
                textAnchor='middle'
                x={innerWidth / 2}
                y={innerHeight + xLabelOffset}
            >{xAxisLabel}</text>
            <AxisBottom xScale={xScale} height={innerHeight} tickFormat={xAxisTickFormat} />
            <text
                transform={`translate(${-yLabelOffset},${innerHeight / 2}) rotate(-90)`}
                textAnchor="middle">
                {yAxisLabel}
            </text>
            <AxisLeft yScale={yScale} width={innerWidth} />

            <Marks xScale={xScale} yScale={yScale} binData={binData} innerHeight={innerHeight} />

            <g ref={brushRef} />
        </g>
    )
}