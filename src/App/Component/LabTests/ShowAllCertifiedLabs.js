import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CertifiedLabs from './CertifiedLabs';

class ShowAllCerfitiedLabs extends Component {

  render () {
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 4 },
      { width: 1200, itemsToShow: 4 },
    ];

    return (
      <div>
        <h6 className="certi-title">Certified Partner Labs</h6>
      <Carousel breakPoints={breakPoints}>
        {CertifiedLabs.allLabs.map((lab) => (  
                    <Card key={lab.item_id} variant="outlined" style={{margin: '15px'}} className="lab-card">
                    <CardContent>
                        <Typography>
                            <img src={lab.item_logo} className="lab-image"></img>
                        </Typography>
                        <Typography component="h6" className="lab-name">
                            {lab.item_name}
                        </Typography>
                        <Typography color="textSecondary" className="certification">
                            {lab.certifications}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
      </Carousel>
      </div>
    )
  }
}

export default ShowAllCerfitiedLabs;