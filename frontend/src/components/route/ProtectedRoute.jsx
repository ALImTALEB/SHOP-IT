import React, {  Fragment} from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import {  useSelector  } from 'react-redux'

const ProtectedRoute = ({ component: Component  , isAdmin , ...rest}) => {

  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    const navigate = useNavigate()

     return (
        <Fragment>
            {loading === false && (
              <Routes>
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return navigate('/login')
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return navigate('/')
                        }

                        return <Component {...props} />
                    }}
                />
                </Routes>
            )}
        </Fragment>
    )
}
export default ProtectedRoute