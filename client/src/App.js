import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetOtpOnEmail from './components/getOtpOnEmail/GetOtpOnEmail';
import CreateAccount from './components/createAcoount/CreateAccount';
import EnterEmailToForgotPassword from './components/enterEmailToForgotPassword/EnterEmailToForgotPassword';
import LoginForm from './components/loginForm/LoginForm';
import WIshlist from './components/wishlist/WIshlist';
import FOoter from './components/footer/FOoter';
import ImageSlider from './components/imageSlider/ImageSlider';
import PRoducts from './components/products/PRoducts';
import YourOrders from './components/yourOrders/YourOrders';
import CartPage from './components/cartPage/CartPage';
import Navbar from './components/navbar/Navbar';
import EachProductPage from './components/eachProductPage/EachProductPage';
import CreateNewPassword from './components/createNewPassword/CreateNewPassword';
import LOgout from './components/logout/LOgout';
import CreateProduct from './components/createProduct/CreateProduct';
import EditProducts from './components/editProducts/EditProducts';
import RegistrationSucceded from './components/registrationSucceded/RegistrationSucceded';
function App() {
  return (
    <div>
      <Router>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<><ImageSlider/><PRoducts/></>}/>
            <Route exact path='/createaccount' element={<CreateAccount/>}/>
            <Route exact path='/login' element={<LoginForm/>}/>
            <Route exact path='/cartpage' element={<CartPage/>}/>
            <Route exact path='/yourorders' element={<YourOrders/>}/>
            <Route exact path='/enteremailtoforgotpassword' element={<EnterEmailToForgotPassword/>}/>
            <Route exact path='/getotponemail' element={<GetOtpOnEmail/>}/>
            <Route exact path='/wishlist' element={<WIshlist/>}/>
            <Route exact path='/eachproductpage' element={<EachProductPage/>}/>
            <Route exact path='/createnewpassword' element={<CreateNewPassword/>}/>
            <Route exact path='/logout' element={<LOgout/>}/>
            <Route exact path='/createproduct' element={<CreateProduct/>}/>
            <Route exact path='/editproduct' element={<EditProducts/>}/>
            <Route exact path='/registrationsucceded' element={<RegistrationSucceded/>}/>
          </Routes>
          <FOoter/>
      </Router>
    </div>   
  );
}

export default App;
