import React from 'react'

const FilterButtons = (props) => {
    return (
        <button onClick={props.click} id={props.id} className="btn btn-success mr-2">{props.text}</button>
    )
}

export default FilterButtons