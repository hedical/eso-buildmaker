import React from 'react'
import ReactTooltip from "react-tooltip";

const MyTooltip = (props) => {
    console.log("props", props.piece);
    return (

        <>
            <a data-tip data-for={props.piece}><img src={require(`../utils/images/${props.piece}.png`)} className="card-img" alt={"alt"} /></a>
            <ReactTooltip id={props.piece} className='tooltip custom-color-no-arrow'
                textColor='#eeca2a' backgroundColor='#222' effect='solid' border={true} borderColor='white' place={'top'} type={'light'} max-width="250px">
                <h2 >{props.setInfo.set.name}</h2>
                <ul>
                    <li>{props.setInfo.set.bonus_item_1 ? `(1 item) ${props.setInfo.set.bonus_item_1}` : ""}</li>
                    <li>{props.setInfo.set.bonus_item_2 ? `(2 items) ${props.setInfo.set.bonus_item_2}` : ""}</li>
                    <li>{props.setInfo.set.bonus_item_3 ? `(3 items) ${props.setInfo.set.bonus_item_3}` : ""}</li>
                    <li>{props.setInfo.set.bonus_item_4 ? `(4 items) ${props.setInfo.set.bonus_item_4}` : ""}</li>
                    <li>{props.setInfo.set.bonus_item_5 ? `(5 items) ${props.setInfo.set.bonus_item_5}` : ""}</li>
                </ul>
            </ReactTooltip>
        </>
    )
}

export default MyTooltip
