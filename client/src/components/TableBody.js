import React from 'react'

const TableBody = (props) => {

    const imgStyle = {
        height: "100%",
        width: "100%",
    }
    return (
        <tr>
            <td>
                {/* <img src={iclass ? require(`../../utils/images/${props.children.iclass}.png`) : "https://www.eso-gold.com/images/game_left/the-elder-scrolls-online.png"} style={imgStyle}></img> */}
            </td>
            <td>{props.children.title}</td>
            <td>{props.children.iclass}</td>
            <td>{props.children.role}</td>
        </tr >
    )
}

export default TableBody