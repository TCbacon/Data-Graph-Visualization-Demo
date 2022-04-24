import React, { useEffect, useState } from 'react';
import { scaleLinear, max, min, csv } from 'd3';
import { Marks } from './Marks';
import { AxisLeft } from './AxisLeft';
import { AxisBottom } from './AxisBottom';
import './styles.css';

export const ScatterPlot = () => {

    const title = "Iris Plant Width and Height Comparison";
    const width = 1030;
    const height = 500;
    const margin = { top: 20, right: 40, bottom: 65, left: 90 };
    const xLabelOffset = 30;
    const yLabelOffset = 50;
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right
    const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

    const [data, setData] = useState(null);

    const xValue = d => d.petal_length;
    const yValue = d => d.sepal_width;

    useEffect(() => {
        const row = d => {
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            return d;
        }

        csv(csvUrl, row).then((data) => {
            setData(data)
        })
    }, []);



    if (!data) {
        return <h1>Loading {title}</h1>;
    }

    const xScale = scaleLinear()
        .domain([min(data, xValue), max(data, xValue)])
        .range([0, 900])
        .nice()

    const yScale = scaleLinear()
        .domain([min(data, yValue), max(data, yValue)])
        .range([0, 400])

    return (
        <>
            <h1>{title}</h1>
            <svg className='svg-container' width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <text
                        className="axis-label"
                        x={innerWidth / 2}
                        y={innerHeight + xLabelOffset}
                        textAnchor="middle"
                    >Petal Length</text>
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        transform={`translate(${-yLabelOffset},${innerHeight /
                            2}) rotate(-90)`}
                    >
                        Sepal Width
                    </text>
                    <AxisBottom xScale={xScale} height={innerHeight} />
                    <Marks xScale={xScale} yScale={yScale} xVal={xValue} yVal={yValue} data={data} />

                    <AxisLeft yScale={yScale} width={innerWidth} />
                </g>
            </svg>
        </>
    )
}