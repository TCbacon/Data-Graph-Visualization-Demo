import React, { useEffect, useState } from 'react';
import { scaleLinear, max, min, csv, timeMonths, sum, timeFormat} from 'd3';
import { bin } from 'd3';
import { Marks } from './Marks';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import './styles.css';

export const Histogram = () => {

    const title = "Missing Migrants";
    const width = 1030;
    const height = 500;
    const margin = { top: 20, right: 40, bottom: 65, left: 90 };
    const xLabelOffset = 50;
    const yLabelOffset = 50;
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const xAxisTickFormat = timeFormat('%m/%d/%Y'); //convert seconds into date

    const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
    
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
          d['Total Dead and Missing'] = +d['Total Dead and Missing'];
          d['Reported Date'] = new Date(d['Reported Date']);
          return d;
        };
        csv(csvUrl, row).then(setData);
      }, []);

    if(!data){
        return null;
    }

    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'Time';
  
    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';

    const xScale = scaleLinear()
        .domain([min(data, xValue), max(data, xValue)])
        .range([0, innerWidth])
        .nice();
    const [start, stop] = xScale.domain();

    let binData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

    const yScale = scaleLinear()
        .domain([0, max(binData, d=>d.y)])
        .range([innerHeight, 0])

    return (
        <>
            <h1>{title}</h1>
            <svg className='svg-container' width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <text
                        textAnchor='middle'
                        x={innerWidth/2}
                        y={innerHeight + xLabelOffset}
                    >{xAxisLabel}</text>
                    <AxisBottom xScale={xScale} height={innerHeight} tickFormat={xAxisTickFormat}/>
                    <text
                    transform={`translate(${-yLabelOffset},${innerHeight / 2}) rotate(-90)`}
                    textAnchor="middle">
                        {yAxisLabel}
                    </text>
                    <AxisLeft yScale={yScale} width={innerWidth}/>
                    <g transform='translate(-30,0)'>
                    <Marks xScale={xScale} yScale={yScale} binData={binData} innerHeight={innerHeight}/>
                    </g>
                 
                </g>
            </svg>
        </>
    )
}