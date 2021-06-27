import React, { useState } from 'react';
import './login.card.style.scss';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component' ;

import { googleSigninStart, emailSigninStart } from '../../redux/user/user.action';



const Logincard = ({googleSigninStart, emailSigninStart}) => {
    const [userCredentials, setUserCredentials] = useState({ email : '', password : ''})
    const {email , password} = userCredentials;
    
    
    
    const handleChange = (event) => {
        const {value, name } = event.target
        console.log({value,name})
        setUserCredentials( 
            {...userCredentials, [name] : value }
            )
    }
    const handleSubmit = async e => {
        e.preventDefault()
        console.log(email, password)
        emailSigninStart(email, password)
    }

    return(
        
        <div className='container'>
                <form className= 'form-container' onSubmit={handleSubmit} >
                    <h3>Admin Login</h3>
                    <FormInput name='email' value={email} label='Email' type='email' handleChange={handleChange}/>
                    <FormInput name='password' value={password} label='Password' type='password' handleChange={handleChange}/>

                    <button type='submit'  className='email hvr-radial-out'><div className='logoEmail'/>Sign in with Email</button>
                    <button type='button' onClick={googleSigninStart} className='google hvr-radial-out'><div className='logoGoogle' />Google Account</button>
                </form>
                <div className='bg-img'/>
        </div>

    )

}

const matchDispatchToProps = (dispatch) => ({
    googleSigninStart : () => dispatch(googleSigninStart()),
    emailSigninStart : (email, password) => dispatch(emailSigninStart({email, password}))
})

export default connect(null, matchDispatchToProps)(Logincard);