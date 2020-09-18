import React from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateBuild from './pages/CreateBuild'

const BannerBgImg1 = "https://esossl-a.akamaihd.net/assets/img/cms/media/114ec4f0bcd0d8c60936e26c3644cfa6_the-elder-scrolls-online-greymoor_wallpaper-1920x1080.jpg"

const Jumbo = (props) => {
    return (
        <Router>
            <Switch>
                <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${BannerBgImg1})` }}>
                    <div className="container">
                        <h1 className="display-4 text-light mx-auto" id="banner-text">{props.text}</h1>
                        {props.action ? <div className="row float-right">
                            <h4 className="text-light text-right mr-3">{props.action}</h4>
                            <Route exact path="/create-build">
                                <AddCircleRoundedIcon />
                            </Route>

                        </div> : <></>}
                    </div>
                </div >
            </Switch>
        </Router>
    )
}

export default Jumbo
