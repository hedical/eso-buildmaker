import React from 'react'
import ReactTooltip from "react-tooltip";

const MyTooltip = (props) => {
    console.log("props", props.piece);
    return (

        <>
            <a data-tip data-for='shoulder'><img src={require("../utils/images/shoulder.png")} className="card-img" alt={"alt"} /></a>
            <ReactTooltip id='shoulder' className='tooltip custom-color-no-arrow'
                textColor='#eeca2a' backgroundColor='#222' effect='solid' border={true} borderColor='white' place={'top'} type={'light'} max-width="250px">
                <h2 >{props.piece.set.name}</h2>
                <ul>
                    <li>{props.piece.set.bonus_item_1 ? `(1 item) ${props.piece.set.bonus_item_1}` : ""}</li>
                    <li>{props.piece.set.bonus_item_2 ? `(2 items) ${props.piece.set.bonus_item_2}` : ""}</li>
                    <li>{props.piece.set.bonus_item_3 ? `(3 items) ${props.piece.set.bonus_item_3}` : ""}</li>
                    <li>{props.piece.set.bonus_item_4 ? `(4 items) ${props.piece.set.bonus_item_4}` : ""}</li>
                    <li>{props.piece.set.bonus_item_5 ? `(5 items) ${props.piece.set.bonus_item_5}` : ""}</li>
                </ul>
            </ReactTooltip>
        </>
    )
}

export default MyTooltip
