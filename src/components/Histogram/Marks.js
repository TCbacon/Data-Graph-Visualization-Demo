import './styles.css';

export const Marks = ({xScale, yScale, binData, innerHeight=300}) => {
   
    return (binData.map((d, idx) => {
        return (
            <rect
            className='circle'
                key={idx}
                x={xScale(d.x0)}
                y={yScale(d.y)}
                width={xScale(d.x1) - xScale(d.x0)}
                height={innerHeight - yScale(d.y)}
            >
                <title>{d.y}</title>
            </rect>)
    })
    )
}
