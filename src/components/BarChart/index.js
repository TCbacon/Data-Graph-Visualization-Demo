import React, { useEffect, useState } from 'react';
import { scaleBand, scaleLinear, max, csv } from 'd3';
import { Marks } from './Marks';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import './styles.css';

export const BarChart = () => {

    const title = "Bar Chart";
    const width = 1030;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 65, left: 190 };
    const xLabelOffset = 30;
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    const csvUrl = "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

    const [data, setData] = useState(null);

    const xValue = d => d.Population
    const yValue = d => d.Country

    useEffect(() => {
        const row = d => {
            d.Population = +d['1969'];
            return d
        }

        csv(csvUrl, row).then((data) => {
            setData(data.slice(0, 10))
        })
    }, []);

    if (!data) {
        return <h1>Loading {title}</h1>;
    }

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, 900])
        .nice();

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, 400])
        .paddingInner(0.4)

    return (
        <>
            <h1>{title}</h1>
            <svg className='svg-container' width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom xScale={xScale} height={innerHeight} />
                    <Marks xScale={xScale} yScale={yScale} xVal={xValue} yVal={yValue} data={data} />

                    <text
                        className='axis-label'
                        x={innerWidth / 2}
                        y={innerHeight + xLabelOffset}
                        textAnchor="middle"
                    >
                        Population
                    </text>

                    <AxisLeft yScale={yScale} />
                </g>
            </svg>
        </>
    )
}