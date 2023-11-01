import React, { useState } from "react";
import { useContext } from 'react'
import "../../styles/home.css";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export const Home = () => {
	const { store, actions } = useContext(Context)
	const goToContact = useNavigate()
	const [agendaName, setAgendaName] = useState('')
	const handleGoingToContact = () => {
		goToContact("/Contact")
		actions.deletingContact()
		store.nameAgenda = agendaName
		setTimeout(() => {
			actions.deletingContactCompleted()
		}, 3000)
	}
	return (
		<div className="containerHome">
			<h1 className="titleHome">Welcome to the Contact List!</h1>
			<div className="containerImg">
				<img src="https://static.vecteezy.com/system/resources/previews/012/659/686/original/contact-thin-line-color-icons-set-illustration-vector.jpg"
					className="image-Home"
				/>
			</div>
			<div>
				<div className="containerItems">
					<label className="labelInput">You can create a new Agenda below</label>
					<input placeholder="Input the name of the Agenda" onChange={(e) => {
						const value = e.target.value
						setAgendaName(value)
					}} className="inputAgenda" />
					<button className="buttonAgenda" onClick={() => {
						handleGoingToContact()
					}}>Create</button>
				</div>
			</div>
		</div>

	);
}



