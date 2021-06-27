import React, {useState} from 'react'
import './header-component-styles.scss';
import { MdInput } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import {  Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import { signOutSuccess } from '../../redux/user/user.action';
import { selectCurrentUser } from '../../redux/user/user.selector';
// import firebase from '../../firebase/firebase.utils';
import firebase from 'firebase/app'



const Header = ({signOutSuccess,currentUser, writeUserData})=> {

    const initialFieldValues = {
        fullName : '',
        email: '',
        phoneNumber : ''
    }

    const [values, setValues] = useState(initialFieldValues);

    // const handleAddUser = () => {
    //     const todoRef = firebase.database().ref('dashboard/' + currentUser.id);
    //     todoRef.set({...values})

    // }


    const handleChange = (e) => {
        const {value, name} = e.target;
        
        setValues({
            ...values,
            [name] : value
        })
        console.log(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        writeUserData({
            ...values
        })
    }
    console.log(currentUser)
    return(
        <div className='header'>
            <div className='title'>
                <span>Dashboard</span>
                <span>{`Welcome ${currentUser.displayName}`}</span>
                {
                    currentUser ? (<MdInput className='logout' alt='logouut' onClick={signOutSuccess}/>) : (<Redirect to ='/' />)
                }
            </div>
            <form className='form'>
                <div class="input-group flex-nowrap">
                    <input name='fullName' type="text"  class="form-control" placeholder="Full name" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <div class="input-group flex-nowrap">
                    <input name='email' type="email"  class="form-control" placeholder="@email address" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <div class="input-group flex-nowrap">
                    <input name='phoneNumber' type="number"  class="form-control" placeholder="Phone number" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <FaSave type='submit' onClick={handleSubmit} className='save'/>
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state)
})

const mapDispatchToProps= (dispatch) => ({
    signOutSuccess : () => dispatch(signOutSuccess())
})

export default connect(mapStateToProps,mapDispatchToProps)( Header );