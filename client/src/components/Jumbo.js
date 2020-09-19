import React from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateBuild from './pages/CreateBuild'

const BannerBgImg1 = require(`../utils/images/jumbo.png`)


const Jumbo = (props) => {
    return (

        <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${BannerBgImg1})` }}>
            <div className="container">
                <h1 className="display-4 text-light mx-auto" id="banner-text">{props.text}</h1>
                {props.action ? <div className="row float-right">
                    <h2 className="text-light text-right mr-3" >{props.action}</h2>
                    <Link to={props.link}>
                        <AddCircleRoundedIcon />
                    </Link>

                </div> : <></>}
                {props.comment ? <div className="row float-right">
                    <h5 className="text-light text-right mr-3">"{props.comment}"</h5>
                </div> : <></>}
            </div>
        </div >

    )
}

export default Jumbo
