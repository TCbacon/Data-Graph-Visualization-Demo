
export const AxisLeft = ({ yScale, width = 500 }) =>

    yScale.ticks().map(tickVal => {
        return (

            <g key={tickVal} transform={`translate(0, ${yScale(tickVal)})`}>
                <line className='x-grid-lines' x2={width} y1={0} />
                <text
                    style={{ textAnchor: 'end' }}
                    x={-10}
                    dy=".32em"
                    y={2}>
                    {tickVal}
                </text>
            </g>
        )
    }
    )