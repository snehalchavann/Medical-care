import React, {  useState } from "react";
import Carousel from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import data from "./data";
import OnSelectedItem from "./OnSelectedItem";
// import AllTestData from "./AllTestData";

const useStyles = makeStyles({
    root: {
      minWidth: 245,
      minHeight: 200
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
    hr2:{
        margin: 0,
    }
  });


const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 4 },
      { width: 1200, itemsToShow: 4 },
    ];

export default function PopularTests(props){
    const classes = useStyles();
    const {history, data} = props
    const onClick = (test) => {
      console.log(history, 'rpops...')
      history.push({
        pathname: 'test',
        state: {data: test}
      })
    }

    console.log(data, 'skrrrr...')
        return (
            <div>
                <h6 className="certi-title">Popular Tests</h6>
                <Carousel breakPoints={breakPoints}>
                {data.map((test) => (
                    <Card key={test._id} className={classes.root} variant="outlined" style={{margin: '15px'}}>
                    <CardContent style={{height: '104px'}}>
                        <Typography component="h6">
                            {test.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {test.certifiedLabs}
                        </Typography>
                        <Typography variant="body2" component="p">
                            ${test.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" className="learnMore" onClick={() => onClick(test)}>Learn More</Button>
                    </CardActions>
                </Card>
                ))}
            </Carousel>
            {/* {user ? <OnSelectedItem></OnSelectedItem> : null} */}
            </div>
        )
    
}

