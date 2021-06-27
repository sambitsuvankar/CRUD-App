import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import './dashboard-form-styles.scss'
import UserComponent from '../user-component/user-component'
import Popup from '../popup/popup.component'
// import {toogleTextField} from '../../redux/user/user.action';
import {selectToogleTextField} from '../../redux/user/user.selector'

const DashboardForm = ({selectToogleTextField})=> {



    const [userData, setUserData] = useState([]);

    const [editData, setEditdata] = useState({});

    
    ////////////////////////////////////////////////

    useEffect(() => {
        const firestore = firebase.database().ref('/dashboard');

        firestore.on('value', (response) => {
            const data = response.val()
            let userInfo = []
            console.log(data)

            for(let id in data) {

                let obj ={
                    id : id,
                    fullName : data[id].fullName,
                    email : data[id].email,
                    phoneNumber : data[id].phoneNumber
                  }
                  userInfo.push(obj)
                }
                setUserData(userInfo)
            }
        )
    }, [])
    console.log(userData)

    /////////////////////////////////////////////
    const handleEditData = (data) =>{
        const {id, fullName, email, phoneNumber} = data;
        setEditdata({
            ...editData,
            id,
            fullName,
            email,
            phoneNumber
        })
    }


    ///////////////////////////////////////////////////////
    return(
        <div className='userSection'>
        {
            userData.map( (data, i) => (<UserComponent index={i+1} data={data} handleEditData={handleEditData}/>))
        }
        {
            selectToogleTextField ? (<Popup editData={editData}/>) : (null)
        }
            
        </div>
    )
}

const mapStateToProps = state => ({
    selectToogleTextField : selectToogleTextField(state)
})


export default connect(mapStateToProps)(DashboardForm)