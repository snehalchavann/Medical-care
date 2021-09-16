import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Login from './Component/Login';
import changePassword from './Component/changePassword/changePassword'
import Register from './Component/Register/Register';
import Checkout from './Component/Checkout/Checkout';
import dashboard from './Component/dashboard/dashboard';
import Home from './Component/Home';
import emailConfirmation from './Component/changePassword/emailConfirmation';
import NavbarHome from './Component/Header/NavbarHome';
import CheckoutToCart from './Component/Cart/CheckoutToCart';
import ProductDetails from './Component/productDetails/productDetails';
import PayPal from './Component/Checkout/PayPal';
import ProductList from './Component/productsList/productList';
import SubCategories from './Component/Category/SubCategories';
import LabTestPage from './Component/LabTests/LabTestPage';
import OnSelectedItem from './Component/LabTests/OnSelectedItem';
import AllTestData from './Component/LabTests/AllTestData';
import AllTestDetails from './Component/LabTests/AllTestDetails';
import Footer from './Component/Footer/footer'
import TermsAndConditions from './Component/TermsAndConditions';
import PrivacyPolicy from './Component/Footer/PrivacyPolicy';
import UploadPrescription from './Component/LabTests/UploadPrescription';
import Profile from './Component/Profile/profile';
class Parent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('window ', window.location.hash.split('#/')[1]);
    return (
      <div className='Parent' style={{
        width: '100%',
        position: 'absolute',
        fontSize: '1.5rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        background: '#f4f8f9',
        minHeight: '100%',
        top: 0,
        left: 0
      }}>
        <HashRouter>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={`/profile`} component={Profile} />
            <Route exact path={`/login`} component={Login} />
            <Route path={`/Register`} component={Register} />
            <Route exact path={`/confirmEmail`} component={emailConfirmation} />
            <Route exact path={`/changePassword`} component={changePassword} />
            <Route path={`/Dashboard`} component={dashboard} />
            <Route path={`/productList`} component={ProductList} />
            <Route path={`/productDetails`} component={ProductDetails} />
            <Route path={`/checkout`} component={Checkout} />
            <Route path={'/cart'} component={CheckoutToCart} />
            <Route path={'/payment'} component={PayPal} />
            <Route path={'/Lab_Tests'} component={LabTestPage} />
            <Route path={`/uploadPrescription`} component={UploadPrescription}/>
            <Route path={'/test'} component={OnSelectedItem} />
            <Route path={'/allLabs'} component={AllTestDetails} />
            <Route exact path={'/:id'} component={SubCategories} />
            <Route exact path={'/:id/:id'} component={ProductList} />
            <Route path={'/terms'} component={TermsAndConditions} />
            <Route path={'/privacyPolicy'} component={PrivacyPolicy} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export { Parent };
