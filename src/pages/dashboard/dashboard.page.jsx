import React from 'react'
import dashboardForm from '../../components/dashboard-component/dashboard-form-component';
import Header from '../../components/header/header-component';
import './dashboard.styles.scss'
import firebase from '../../firebase/firebase.utils'

const Dashboard = () => {

    function writeUserData({fullName, email, phoneNumber}) {
        firebase.database().ref('users/').set({
          fullName: fullName,
          email: email,
          phoneNumber : phoneNumber
        });
      }
    

    return(
        <div className='dashboard'>
            <div className='dashboard-Container'>
                <Header writeUserData={writeUserData}/>
                <dashboardForm/>
            </div>
        </div>
    )
}

export default Dashboard;