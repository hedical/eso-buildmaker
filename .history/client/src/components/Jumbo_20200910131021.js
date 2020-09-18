import React from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const BannerBgImg1 = "https://esossl-a.akamaihd.net/assets/img/cms/media/114ec4f0bcd0d8c60936e26c3644cfa6_the-elder-scrolls-online-greymoor_wallpaper-1920x1080.jpg"

const Jumbo = (props) => {
    return (
        <div className="jumbotron jumbotron-fluid" style={{ backgroundImage: `url(${BannerBgImg1})` }}>
            <div className="container">
                <h1 className="display-4 text-light mx-auto" id="banner-text">{props.text}</h1>
                {props.action ? <div className="row float-right">
                    <h4 className="lead text-light text-right mr-3">{props.action}</h4>
                    <AddCircleRoundedIcon />
                </div> : <></>}
            </div>
        </div >
    )
}

export default Jumbo
