import React, {useState} from 'react'
import './header-component-styles.scss';
import { MdInput } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai"

import {  Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import { signOutSuccess, toggleForm } from '../../redux/user/user.action';
import { selectCurrentUser, selectToggleAction } from '../../redux/user/user.selector';
// import firebase from '../../firebase/firebase.utils';




const Header = ({signOutSuccess,currentUser, writeUserData, toggleForm, toggleAction})=> {

    const initialFieldValues = {
        fullName : '',
        email: '',
        phoneNumber : ''
    }

    const [values, setValues] = useState(initialFieldValues);
////////////////////////////////////////////////////
    

//////////////////////////////////////////////////
    const handleChange = (e) => {
        const {value, name} = e.target;
        
        setValues({
            ...values,
            [name] : value
        })
        
    }
//////////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!values.fullName || !values.email || !values.phoneNumber) return;
        writeUserData({
            ...values
        })
        toggleForm()
    }
//////////////////////////////////////
    return(
        <div className='header'>
            <div className='title'>
                <span>Dashboard</span>
                {
                    currentUser ? (<span>{`Welcome ${currentUser.displayName}`}</span>) : ("")
                }
                <AiOutlineUserAdd className='addUser' onClick={toggleForm}/>
                {
                    currentUser ? (<MdInput className='logout' alt='logouut' onClick={signOutSuccess}/>) : (<Redirect to ='/' />)
                }
            </div>
            <div className={`${toggleAction ? `hidden` : ``} tileHeading`}>
                <div className='tileSection'>Sl No.</div>
                <div className='tileSection'>FULL NAME</div>
                <div className='tileSection'>EMAIL ADDRESS</div>
                <div className='tileSection'>PHONE NUMBER</div>
                <div className='tileSection'>EDIT</div>
                <div className='tileSection'>DELETE</div>
            </div>
            <form className={`${toggleAction ? `` : `hidden`} form`}>
                <div className="input-group flex-nowrap">
                    <input name='fullName' type="text"  className="form-control" placeholder="Full name" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <div className="input-group flex-nowrap">
                    <input name='email' type="email"  className="form-control" placeholder="@email address" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <div className="input-group flex-nowrap">
                    <input name='phoneNumber' type="number"  className="form-control" placeholder="Phone number" aria-label="Username" aria-describedby="addon-wrapping" onChange={handleChange}/>
                </div>
                <FaSave type='submit' onClick={handleSubmit} className='save'/>
            </form>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state),
    toggleAction : selectToggleAction(state)
})

const mapDispatchToProps= (dispatch) => ({
    signOutSuccess : () => dispatch(signOutSuccess()),
    toggleForm : () => dispatch(toggleForm())
})

export default connect(mapStateToProps,mapDispatchToProps)( Header );