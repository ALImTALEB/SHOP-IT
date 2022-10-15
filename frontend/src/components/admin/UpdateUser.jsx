import React, {Fragment, useState, useEffect} from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, clearErrors, getUserDetails } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()
    const params = useParams()

    const navigate = useNavigate()

    const {  error, isUpdated } = useSelector(state => state.user)
    const {user} = useSelector(state => state.userDetails)

    const userId = params.id

    useEffect( () => {

        if(user && user._id !== userId ) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated) {
            alert.success('User updated successfully')

            navigate('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, user, userId] )

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('role', role)

        dispatch(updateUser(formData))
    }

  return (
    <Fragment>
    <MetaData title={`Update User`} />
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10">
            <Fragment>
            
     
            </Fragment>
        </div>
    </div>

</Fragment>
  )
}

export default UpdateUser