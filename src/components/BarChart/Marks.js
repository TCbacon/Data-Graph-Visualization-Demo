import './styles.css';

export const Marks = ({xScale, yScale, xVal, yVal, data,toolTipFormat}) => {
    return (data.map((d) => {

        return (
            <rect
            className='rectangle'
                key={yVal(d)}
                x={0}
                y={yScale(yVal(d))}
                width={xScale(xVal(d))}
                height={yScale.bandwidth()}
            >
                <title>{toolTipFormat(xVal(d))}</title>
            </rect>)
    })
    )
}
