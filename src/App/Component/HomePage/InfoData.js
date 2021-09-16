import img1 from '../../images/income.png';
import img2 from '../../images/reliability.png';
import img3 from '../../images/shield.png';

const InfoData = {
    info: [
        {
            _id: 1,
            name: "Reliable",
            desc: "All products displayed on Medical Care are procured from verified and licensed pharmacies. All labs listed on the platform are accredited",
            info_image: {img2}
        },
        {
            _id: 2,
            name: "Secure",
            desc: "Medical Care uses Secure Sockets Layer (SSL) 128-bit encryption and is Payment Card Industry Data Security Standard (PCI DSS) compliant",
            info_image: {img3}
        },
        {
            _id: 3,
            name: "Affordable",
            desc: "Find affordable medicine substitutes, save up to 50% on health products, up to 80% off on lab tests and free doctor consultations.",
            info_image: {img1}
        }
    ]
}


export default InfoData;