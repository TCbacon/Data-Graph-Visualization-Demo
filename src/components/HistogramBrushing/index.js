import React, { useState} from 'react';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Histogram } from './Histogram';
import { WorldMap } from './WorldMap';
import './brushstyles.css';


const width = 1030;
const height = 600;
const sizeOffset = 0.3;
const title ='Missing Migrants with Brushing';
const xValue = d => d['Reported Date'];

export const HistogramBrushing = () => {

    const worldAtlasData = useWorldAtlas();
    const histogramData = useData();

    const [brushExtent, setBrushExtent] = useState(null);

    if (!worldAtlasData || !histogramData) {
        return <pre>Loading...</pre>;
    }

    const filteredData = brushExtent ? histogramData.filter(d => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      }) : histogramData;

    return (
        <>
            <h1>{title}</h1>
            <svg className='svg-container' width={width} height={height}>
                <WorldMap data={histogramData} filteredData={filteredData} worldAtlas={worldAtlasData} />
                <g transform={`translate(0, ${height - sizeOffset * height})`}>
                    <Histogram width={width} height={height * sizeOffset} xValue={xValue} data={histogramData} setBrushExtent={setBrushExtent} />
                </g>
            </svg>
        </>
    );
}