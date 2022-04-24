import './styles.css';

export const AxisBottom = ({xScale, height, tickFormat}) =>
    xScale.ticks().map(tickVal =>
        <g key={tickVal} transform={`translate(${xScale(tickVal)}, 0)`}>
            <line className='y-grid-lines' y2={height} y1= {0} />
            <text dy=".71em" style={{ textAnchor: 'middle' }} y={height + 10}>
                {tickFormat(tickVal)}
            </text>
        </g>
    )