import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function ImgMediaCard(props) {

    return (

        <div className="card bg-dark text-white col-4">
            <img className="card-img" src="https://images.mmorpg.com/images/heroes/news/43780.jpg" alt="Card image" />
            <div className="card-img-overlay">
                <div className="row pull-right">
                    <Chip className="" label={props.children.role} size="small" color="primary" />
                    <Chip className="" label={props.children.iclass} size="small" color="primary" />
                </div>
                <h4 className="card-title p-2">{props.children.title}</h4>
                <h5 className="card-text">{props.children.race}</h5>
                <div className="row">
                    <ShareIcon />
                    <StarIcon />
                    <EditIcon />
                </div>
            </div>
        </div>

        // <Card className={classes.root, "col-4 m-2"}>
        //     <CardActionArea>
        //         <CardMedia
        //             component="img"
        //             alt="Contemplative Reptile"
        //             height="140"
        //             image="https://i.pcmag.com/imagery/reviews/05S57hrwRPndjMm9yJB4Nct-4.1569471951.fit_scale.size_1028x578.jpg"
        //             title="Contemplative Reptile"
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h5" component="h2">
        //                 {props.children.title}
        //             </Typography>
        //             <Typography variant="body2" color="textSecondary" component="p">
        //                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        //                 across all continents except Antarctica
        //   </Typography>
        //         </CardContent>
        //     </CardActionArea>
        //     <CardActions>
        //         <Button size="small" color="primary">
        //             Share
        // </Button>
        //         <Button size="small" color="primary">
        //             Learn More
        // </Button>
        //     </CardActions>
        // </Card>


    );
}

