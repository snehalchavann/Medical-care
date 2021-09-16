import React, { Component } from 'react';
import MoreInfoData from './MoreInfoData';

class MoreLabInfo extends Component {
  render() {
    return (
      <div className="options-style">
        {MoreInfoData.info.map((detail) => (
          <div key={detail._id} className="more-info">
            <div>
              <img src={detail.info_image} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}></img>
            </div>
            <div className="info-name" style={{ textAlign: 'center' }}><h4>{detail.name}</h4></div>
            <div className="info-desc">
              <p>{detail.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default MoreLabInfo;