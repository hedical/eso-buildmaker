import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const [selectedSet, setSelectedSet] = useState("");

// useEffect(() => {
//     setSelectedSet(selectedSet);
// }, [])


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



export default function SimpleCard({ ...props }) {


    const [selectedSet, setSelectedSet] = useState("");

    useEffect(() => {
        setSelectedSet(props.set);
    }, [])

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.set ? props.set.type : "no wow"}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.set ? props.set.name : "no wow"}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.set ? props.set.bonus_item_1 : "no wow"}
                    <br />
                    {props.set ? props.set.bonus_item_2 : "no wow"}
                    <br />
                    {props.set ? props.set.bonus_item_3 : "no wow"}
                    <br />
                    {props.set ? props.set.bonus_item_4 : "no wow"}
                    <br />
                    {props.set ? props.set.bonus_item_5 : "no wow"}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    href={props.set ? ("https://eso-sets.com/set/" + props.set.slug) : ""}
                    target="_blank"
                >More Info</Button>
            </CardActions>
        </Card>
    );
}
