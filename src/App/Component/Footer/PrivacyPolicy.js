import React from 'react';
import NavbarHome from '../Header/NavbarHome';
import Footer from './Footer';

function PrivacyPolicy() {
    return (
        <div className="privacyPolicy">
            <div className="privacyPolicy__content">
            <NavbarHome></NavbarHome>
            <div className="privacyPolicy__Header">
                <span class="name">PRIVACY POLICY</span>
            </div>
            <div>
            <p className="terms__para_one">Company views the protection of Your privacy and information as a very important principle. We store and process Your Account Information including any sensitive personal / financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2000 and Rules there under. Company’s current Privacy Policy is available at www.medicalCare.in/privacy-policy. If You object to Your Information being transferred or used in this way, please do not use Website. Company will share / sell / transfer / license / covey some or all of your personal information with another business entity, should we (or our assets) plan to merge with or are acquired by that business entity, or re-organization, amalgamation, restructuring of business or for any other reason whatsoever. Should such a transaction or situation occur, the other business entity or the new combined entity will be required to follow the privacy policy with respect to Your personal information. Once You provide Your information to us, You provide such information to Company and affiliates of Company and such Company and its affiliate may use such information to provide You various services with respect to Your transaction, whether such transaction are conducted on www.pharmeasy.in or with third party merchant's or third party merchant's website.
The User hereby consents, expresses and agrees that he/she has read and fully understands the Privacy Policy of Company in respect of the Website. You further consent that the terms and contents of such Privacy Policy are acceptable to You. </p>
        </div>
        <Footer/>
        </div>
        </div>
    );
}

export default PrivacyPolicy;
