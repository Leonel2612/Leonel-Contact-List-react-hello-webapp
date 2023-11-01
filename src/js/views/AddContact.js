import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'


const AddContact = () => {
  const { store, actions } = useContext(Context)
  const [agendaSlug, setAgendaSlug] = useState(store.nameAgenda)
  const returnToContact = useNavigate()

  const [formData, setFormData] = useState(store.formData)

  const handlerInput = (e, nameOfValue) => {
    const value = e;
    setFormData({
      ...formData, [nameOfValue]: value,
      agenda_slug: agendaSlug
    })
  }
  const handleSubmit = async (formData) => {
    actions.isSubmittingContacts()
    console.log(formData)
    try {
      await actions.createNewContact(formData)
      setTimeout(() => {
        actions.submittingCompleted()
        actions.goBackToContacts()
      }, 3000)
    }
    catch (error) {
      console.log('Requested failed!', error)
    }
  }

  const handleUpload = async (formData, contactId) => {
    actions.isSubmittingContacts()
    try {
      await actions.updatedContact(formData, contactId)
      setTimeout(() => {
        actions.submittingCompleted()
        actions.changeToSubmit()
        actions.goBackToContacts()
      }, 3000)
    }
    catch (error) {

      console.log('Requested failed!', error)
    }
  }

  return (
    <div className='container-FormAddContact'>
      <h2 className='title-AddanewContact'>Add a new Contact</h2>
      <div className='container-form'>
        <form id='contact-form' className='form-card'>
          <div className='container-input-text'>
            <label>Full Name</label>
            <input type='text' placeholder='Full Name' onChange={(e) => handlerInput(e.target.value, e.target.name)} id='fName' name='full_name' className='input-details' />
            <label>Email</label>
            <input type='text' placeholder='Enter email' onChange={(e) => handlerInput(e.target.value, e.target.name)} id='email' name='email' className='input-details' />
            <label>Phone</label>
            <input type='text' placeholder='Enter Phone' onChange={(e) => handlerInput(e.target.value, e.target.name)} id='phone' name='phone' className='input-details' />
            <label>Address</label>
            <input type='text' placeholder='Enter address' onChange={(e) => handlerInput(e.target.value, e.target.name)} id='address' name='address' className='input-details' />
            <label>Name of the agenda that you want to save the new contact</label>
            <input type='text' placeholder={store.nameAgenda} onChange={(e) => handlerInput(store.nameAgenda, e.target.name)} id='Agenda' name='agenda_slug' className='input-details' disabled={true} />
          </div>
        </form>
        {
          store.isCreatingNewContact ? <button className='input-submit' onClick={() =>

            !store.isAnUpload ? handleSubmit(formData) : handleUpload(formData, store.contactId)

          } disabled={store.isSubmitting} > {!store.isSubmitting ? 'Submit' : 'Submitting'} </button> : returnToContact("/Contact")
        }
        <div>
          <Link to='/Contact' onClick={() => {
            actions.goBackToContacts();
            actions.changeToSubmit();
          }}>Or get back to contacts</Link>
        </div>
      </div >
    </div >
  )
}

export default AddContact

