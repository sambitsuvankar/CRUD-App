import React  from 'react'
import './user-styles.scss'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { connect } from 'react-redux'
import { toogleTextField } from '../../redux/user/user.action'


const UserComponent = (props) => {

    
    


    const {id,fullName, email, phoneNumber} = props.data;
    const toogleTextField = props.toogleTextField;
    const handleEditData = props.handleEditData;
    const handleDelete = props.handleDelete;


    return(
        <div key={id} className='userTile'>
            <div className='tileSection'>{props.index}</div>
            <div className='tileSection'>{fullName}</div>
            <div className='tileSection'>{email}</div>
            <div className='tileSection'>{phoneNumber}</div>
            <div className='tileSection'><FaEdit className='edit' onClick={()=> { toogleTextField(); handleEditData(props.data) } }/></div>
            <div className='tileSection'><MdDelete className='delete' onClick={() => handleDelete(id)} /></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toogleTextField : () => dispatch(toogleTextField())
})

export default connect(null, mapDispatchToProps)(UserComponent);