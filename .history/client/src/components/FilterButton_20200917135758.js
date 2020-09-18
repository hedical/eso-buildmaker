import React from 'react'

const FilterButtons = (props) => {
    return (
        <button onClick={props.click} className="btn btn-success mr-2">{props.text}</button>
    )
}

export default FilterButtons