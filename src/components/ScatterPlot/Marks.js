import './styles.css';

export const Marks = ({xScale, yScale, xVal, yVal, data}) => {
    return (data.map((d, idx) => {
        return (
            <circle
            className='circle'
                key={idx}
                cx={xScale(xVal(d))}
                cy={yScale(yVal(d))}
                r="5"
            >
                <title>{xVal(d)}</title>
            </circle>)
    })
    )
}
