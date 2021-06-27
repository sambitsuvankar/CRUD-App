import React ,{ useState } from 'react'
import './popup.styles.scss'
import {FaTimesCircle } from "react-icons/fa"

import ContainedButtons from '../button/button.component'
import { connect } from 'react-redux'
import { toogleTextField } from '../../redux/user/user.action';
import firebase from 'firebase/app'



const Popup = (props)=> {
    const toogleTextField = props.toogleTextField;
    var editData = props.editData;

    /////////////////////////////////////

    const [fullName, setfullName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // setfullName(editData.fullName);
    // setEmail(editData.email);
    // setPhone(editData.phoneNumber)

   //////////////////////////////////////

    const handleUpdate = () => {
        const firestore = firebase.database().ref('/dashboard').child(editData.id);
        firestore.update({
            fullName : fullName,
            email: userEmail,
            phoneNumber: phone
        })
    }

  

    return (
        <div className='backpopup'>
            <div className='popupForm'>
                <FaTimesCircle className='cross' onClick={toogleTextField}/>
                <div className='group-form'>
                    <div className="input-group flex-nowrap">
                        <input name='fullName' type="text"   className="form-control" placeholder="Full name" aria-label="Username" aria-describedby="addon-wrapping"  onChange={(e) => {setfullName(e.target.value)}}/>
                    </div>
                    <div className="input-group flex-nowrap">
                        <input name='phoneNumber' type="number"  className="form-control" placeholder="Phone number" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => {setPhone(e.target.value)}}/>
                    </div>
                </div>
                <div className="input-group flex-nowrap">
                    <input name='email' type="email"   className="form-control" placeholder="@email address" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <ContainedButtons onClick={()=> {handleUpdate();toogleTextField()}}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toogleTextField : () => dispatch(toogleTextField())
})

export default connect(null, mapDispatchToProps)(Popup);