import React, { useContext } from 'react'
import '../../styles/loaderStyles.css'
import { Context } from '../store/appContext'

const Loader = () => {
    const { store, actions } = useContext(Context)
    return (

        store.deletingContactTime ?
            <div className='loader-container'>
                < svg className="spinner" viewBox="0 0 50 50" >
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg >
            </div > : null
    )
}

export default Loader
