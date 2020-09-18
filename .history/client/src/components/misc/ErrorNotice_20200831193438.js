import React from 'react'

const ErrorNotice = (props) => {
    return (
        <div className="error-notice">
            <span className="bg-danger">{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}

export default ErrorNotice
