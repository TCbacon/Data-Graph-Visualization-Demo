import React, { useEffect, useState} from 'react';
import { scaleBand, scaleLinear, max, csv, format} from 'd3';
import { Marks } from './Marks';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import './styles.css';

export const BarChart = () => {

    const year = '2005';
    const title = "Population";
    const width = 1030;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 65, left: 160 };
    const xLabelOffset = 30;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const csvUrl = "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

    const [data, setData] = useState(null);

    const xValue = d => d.Population;
    const yValue = d => d.Country;

    const siFormat = format('.2s');
    const valueFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    useEffect(() => {
        const row = d => {
            d.Population = +d[year] * 1000;
            if(d.Country === "United States of America"){
                d.Country = "USA";
            }
            return d
        }

        csv(csvUrl, row).then((data) => {
            setData(data.slice(0, 12))
        })
    }, []);

    if (!data) {
        return <h1>Loading {title}</h1>;
    }

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)]) //population
        .range([0, innerWidth])
        .nice();
    
    const yScale = scaleBand()
        .domain(data.map(yValue)) // countries
        .range([0, innerHeight])
        .paddingInner(0.4)

    return (
        <>
            <h1>{title} {year}</h1>
            <svg className='svg-container' width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <AxisBottom xScale={xScale} height={innerHeight} tickFormat={valueFormat}/>
                    <Marks
                     xScale={xScale} 
                     yScale={yScale} 
                     xVal={xValue} 
                     yVal={yValue} 
                     data={data}
                     toolTipFormat={valueFormat}
                    />
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