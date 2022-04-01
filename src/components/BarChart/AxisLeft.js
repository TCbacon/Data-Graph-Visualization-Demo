
export const AxisLeft = ({yScale}) =>
yScale.domain().map(tickVal =>
    <g key={tickVal}>
        <text
            style={{ textAnchor: 'end' }}
            x={-3}
            dy=".32em"
            y={yScale(tickVal) + yScale.bandwidth() / 2}>
            {tickVal}
        </text>
    </g>
)