import React from 'react';
import InfoData from './InfoData';
import img1 from '../../images/income.png';
import img2 from '../../images/reliability.png';
import img3 from '../../images/shield.png';

function MoreInfoOnUs() {
    return (
        <div className="options-style" style={{ width: '70%', alignItems: 'center', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="more-info">
                <div>
                    <img src={img2} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
                </div>
                <div className="info-name" style={{ textAlign: 'center' }}><h4>Reliability</h4></div>
                <div className="info-desc">
                    <p>All products displayed on Medical Care are procured from verified and licensed pharmacies. All labs listed on the platform are accredited.</p>
                </div>
            </div>
            <div className="more-info">
                <div>
                    <img src={img3} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
                </div>
                <div className="info-name" style={{ textAlign: 'center' }}><h4>Secure</h4></div>
                <div className="info-desc">
                    <p>Medical Care uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant</p>
                </div>
            </div>
            <div className="more-info">
                <div>
                    <img src={img1} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
                </div>
                <div className="info-name" style={{ textAlign: 'center' }}><h4>Affordable</h4></div>
                <div className="info-desc">
                    <p>Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.</p>
                </div>
            </div>
        </div>
    )
}

export default MoreInfoOnUs;