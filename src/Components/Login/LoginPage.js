import React from 'react';
import auth from '../../services/auth';
import {Redirect} from "react-router-dom";
import './login.css';
// import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import '../../assets/vendor/animate/animate.css';
import '../../assets/vendor/css-hamburgers/hamburgers.min.css';
import '../../assets/vendor/animsition/css/animsition.min.css';
import '../../assets/vendor/select2/select2.min.css';
import '../../assets/vendor/daterangepicker/daterangepicker.css';
import '../../assets/css/util.css';
import '../../assets/css/main.css';

class LoginPage extends React.Component {
    state = {
        login: '',
        password: '',
        redirectToRefferer: false,
        error: ''
    };

  componentDidMount() {
    auth.signOut((x) => {
      console.log(x);
    }, error => console.log(error));
  }

    login = () => {
        if (this.state.login && this.state.password) {
            auth.login(this.state).then((result) => {
                let responseJSON = result;
                console.log(responseJSON);
                if (responseJSON.data.success) {
                    // console.log("welcome");
                    sessionStorage.setItem('userData', JSON.stringify(responseJSON.data.success));
                    this.setState({redirectToRefferer: true});

                } else {
                    this.setState({error: 'Login ou password incorrect'});
                    // console.log("Login ou password incorrect");
                }
            });
        } else {
            this.setState({error: 'login and password are required'});
            // console.log("login and password are required");
        }
        /*auth.login(() => {
            this.setState(() => ({
                redirectToRefferer: true
            }))
        })*/
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(this.state);
    };

    render() {
        const {redirectToRefferer} = this.state;

        if (redirectToRefferer === true) {
            return (
                <Redirect to='/dashboard'/>
            )
        }

        return (
           <div>
               <div className="limiter">
                   <div className="container-login100 myBackgroundImg">
                       <div className="wrap-login100 p-t-30 p-b-50">
				<span className="login100-form-title p-b-41">
                    Sen bien immobilier Login
				</span>
                           <div className="login100-form validate-form p-b-33 p-t-5">
                               <h4 className="text-danger text-center text-bold">{this.state.error}</h4>
                               <div className="wrap-input100 validate-input" data-validate="Enter username">
                                   <input className="input100" type="text" name="login" placeholder="User name" onChange={this.onChange}/>
                                       <span className="focus-input100" data-placeholder="&#xe82a;"> </span>
                               </div>

                               <div className="wrap-input100 validate-input" data-validate="Enter password">
                                   <input className="input100" type="password" name="password" placeholder="Password" onChange={this.onChange} />
                                       <span className="focus-input100" data-placeholder="&#xe80f;"> </span>
                               </div>

                               <div className="container-login100-form-btn m-t-32">
                                   <button onClick={this.login} className="login100-form-btn">
                                       Login
                                   </button>
                               </div>

                           </div>
                       </div>
                   </div>
               </div>


               <div id="dropDownSelect1"> </div>
           </div>
        )
    }
}

export default LoginPage;
