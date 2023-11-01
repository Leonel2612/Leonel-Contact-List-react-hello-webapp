import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../store/appContext'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const [count, setCount] = useState(0)
  const goToAddContact = useNavigate();
  const goToHome = useNavigate()
  const { store, actions } = useContext(Context)

  useEffect(() => {
    const handlerGetAgenda = async (nameAgenda) => {
      try {
        await actions.getContacts(nameAgenda)
        if (Object.keys(store.contact).length === 0) {
          actions.listIsEmpty()
        }
        else {
          actions.listIsFull()
        }
      }
      catch (error) {
        console.log('Requested failed!', error)
      }
    }
    handlerGetAgenda(store.nameAgenda)
  }, [count])

  const handleUploadDelete = (index) => {
    store.position = []
    store.contact.map((contact, index) => {
      store.position.push(index)
    })
    store.positionContact = store.position.splice(index, 1)
    store.contactToEdit = store.contact[store.positionContact]
    store.contactId = store.contactToEdit.id
    console.log(store.contactId)
    if (store.goToDelete) {
      //Condition in order to get the Modal for Delete Contact
      actions.disableToDelete()
      console.log(store.goToDelete)
      console.log(`este es el id del contacto a eliminar!! ${store.contactId}`)
    }
    else {
      //Upload Contact
      actions.changeToUpload()
    }
  }

  const handleDeletingContact = async (numberOfIdContact) => {
    actions.deletingContact()
    try {
      console.log('procederemos a eliminar el contacto')
      await actions.deleteContact(numberOfIdContact)
      setTimeout(() => {
        setCount(count + 1)
        console.log(count)
        actions.deletingContactCompleted()
      }, 3000)
    }
    catch (error) {
      console.log('Requested failed!', error)
    }
  }

  return (
    <div className='container'>
      <Loader />
      <div className='containerButton'>
        <button className='buttonBack' onClick={() => {
          goToHome('/')
        }}>Back To Home</button>
        {!store.isCreatingNewContact ?
          <button type='button' className='buttonAddContact' onClick={() => {
            actions.addContactNew();
            actions.changeToSubmit();
          }
          }>Add A new Contact</button>
          : goToAddContact("/AddContact")
        }
      </div>

      {store.contactListEmpty ? (<h6 className='noContacts'>You don't have contacts in your agenda. Add a new contact!</h6>) : (
        store.contact.map((contact, index) => (
          <div className='contact-container' key={index}>
            <div className='image-contact'>
              <img src='https://snworksceo.imgix.net/cav/f177b95f-71b5-44f3-bea3-28c768c4349a.sized-1000x1000.png?w=1000' className="imageContactDirect" alt={contact.full_name} />
            </div>
            <div className='contact-information'>
              <h3 className='information-name'> {contact.full_name}</h3>
              <h6 className='information-details-location' style={{ fontSize: '21px' }}> <> <LocationOnIcon className='locationIcon' /> </>{contact.address}</h6>
              <h6 className='information-details-call'> <><PhoneEnabledIcon className='phoneIcon' /> </>{contact.phone}</h6>
              <h6 className='information-details-mail'><><EmailIcon className='emailIcon' /></>{contact.email}</h6>
            </div>
            <div className='icons-contact'>
              <button className='icons-individuals' onClick={() => {
                handleUploadDelete(index);
                actions.addContactNew();
                goToAddContact('/AddContact');
              }}><EditIcon /></button>
              <button className='icons-individuals' id="modalDeleting" data-bs-toggle="modal" data-bs-target="#staticDeleting">
                <DeleteIcon
                  onClick={() => {
                    actions.changeToDelete()
                    console.log(store.goToDelete)
                    handleUploadDelete(index)
                  }}
                />
              </button>
              <div className="modal fade" id="staticDeleting" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">Are you sure?</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>If you delete the contact with the name "{store.contactToEdit.full_name}" of the agenda "{store.contactToEdit.agenda_slug}", you will never recover it again.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-light buttonClose" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                        handleDeletingContact(store.contactId)
                      }}>Yes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        )

      )}

      <div style={{ height: '20px' }}>
      </div>
    </div >
  )

}

export default Contact


///chequear data-bs-dismiss="modal"
// disabled={store.deletingContactTime}
// {!store.deletingContactTime ? 'Yes' : 'Deleting Contact...'}