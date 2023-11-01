const getState = ({ getStore, getActions, setStore }) => {


	return {
		store: {
			contact: [],
			isCreatingNewContact: false,
			isSubmitting: false,
			formData: {
			},
			nameAgenda: '',
			//Variables in order to get the Contact ID and Upload the contact
			position: [],
			positionContact: 0,
			contactId: 0,
			contactToEdit: [],
			//creating a bolean for the button of update
			isAnUpload: false,
			isDeleting: false,
			goToDelete: false,
			deletingContactTime: false,
			contactListEmpty: false,

		},

		actions: {

			addContactNew: () => {
				setStore({ isCreatingNewContact: true })
			},

			goBackToContacts: () => {
				setStore({ isCreatingNewContact: false })
			},

			isSubmittingContacts: () => {
				setStore({ isSubmitting: true })
			},

			submittingCompleted: () => {
				setStore({ isSubmitting: false })
			},

			changeToUpload: () => {
				setStore({ isAnUpload: true })
			},

			changeToSubmit: () => {
				setStore({ isAnUpload: false })
			},

			changeToDelete: () => {
				setStore({ goToDelete: true })
			},

			disableToDelete: () => {
				setStore({ goToDelete: false })
			},

			deletingContact: () => {
				setStore({ deletingContactTime: true })
			},

			deletingContactCompleted: () => {
				setStore({ deletingContactTime: false })
			},

			listIsEmpty: () => {
				setStore({ contactListEmpty: true })
			},
			listIsFull: () => {
				setStore({ contactListEmpty: false })
			},


			getContacts: async (nameAgenda) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${nameAgenda}`,
						{
							method: 'GET',
							headers: {
								'Content-type': 'application/json'
							},
						})

					if (response.ok) {
						const jsonResponse = await response.json()
						const store = getStore()
						console.log(jsonResponse)
						setStore({ ...store, contact: jsonResponse })
					}

					else {
						throw new Error('Requested Failed. Check it out!!')
					}
				}
				catch (error) {
					console.log('Failed!', error)
				}

			},

			createNewContact: async (newContact) => {
				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/',
						{
							method: 'POST',
							body: JSON.stringify(newContact),
							headers: {
								'Content-type': 'application/json'
							},
						})

					if (response.ok) {
						const jsonResponse = await response.json()
						console.log(jsonResponse)
					}

					else {
						throw new Error('Requested Failed. Check it out!!')
					}
				}
				catch (error) {
					console.log('Failed!', error)
				}
			},


			updatedContact: async (newDetails, idContact) => {

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${idContact}`,
						{
							method: 'PUT',
							body: JSON.stringify(newDetails),
							headers: {
								'Content-Type': 'application/json'
							},

						})
					if (response.ok) {
						const responseJson = response.json()
						console.log(responseJson)
					}
					else {
						throw new Error('Requested Failed. Check it out!!')
					}
				}

				catch (error) {
					console.log('Failed!', error)
				}
			},
			deleteContact: async (idContact) => {

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${idContact}`,
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json'
							},
						})
					if (response.ok) {
						const responseJson = response.json()
						console.log(responseJson)
					}
					else {
						throw new Error('Requested Failed. Check it out!!')
					}
				}

				catch (error) {
					console.log('Failed!', error)
				}

			}
		}
	};
};

export default getState;


// // Use getActions to call a function within a fuction
// exampleFunction: () => {
// 	getActions().changeColor(0, "green");
// },
// loadSomeData: () => {
// 	/**
// 		fetch().then().then(data => setStore({ "foo": data.bar }))
// 	*/
// },
// changeColor: (index, color) => {
// 	//get the store
// 	const store = getStore();

// 	//we have to loop the entire demo array to look for the respective index
// 	//and change its color
// 	const demo = store.demo.map((elm, i) => {
// 		if (i === index) elm.background = color;
// 		return elm;
// 	});

// 	//reset the global store
// 	setStore({ demo: demo });
// }