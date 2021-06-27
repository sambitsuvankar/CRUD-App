import React from 'react'
import DashboardForm from '../../components/dashboard-component/dashboard-form-component';
import Header from '../../components/header/header-component';
import './dashboard.styles.scss'
import firebase from '../../firebase/firebase.utils'

const Dashboard = () => {

    function writeUserData({fullName, email, phoneNumber}) {
        const dashDB = firebase.database().ref('/dashboard')
        let data = {
            fullName : fullName,
            email: email,
            phoneNumber: phoneNumber
        }
        dashDB.push(data)
      }
    
    // function handleUpdateUser(){
        
    // }

    return(
        <div className='dashboard'>
            <div className='dashboard-Container'>
                <Header writeUserData={writeUserData}/>
                <DashboardForm/>
            </div>
        </div>
    )
}

export default Dashboard;