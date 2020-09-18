import React from 'react'
import Chip from '@material-ui/core/Chip';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';


export default function ImgMediaCard(props) {

    return (

        <div className="card bg-dark text-white col-4 m-2">
            <img className="card-img" src="https://images.mmorpg.com/images/heroes/news/43780.jpg" alt="Card image" />
            <div className="card-img-overlay">
                <div className="row pull-right">
                    <Chip className="" label={props.children.role} size="small" color="primary" />
                    <Chip className="" label={props.children.iclass} size="small" color="primary" />
                </div>
                <h4 className="card-title p-2 text-uppercase">{props.children.title}</h4>
                <h5 className="card-text">{props.children.race}</h5>
                <div className="row">
                    <ShareIcon />
                    <StarIcon />
                    <EditIcon />
                </div>
            </div>
        </div>


    );
}

