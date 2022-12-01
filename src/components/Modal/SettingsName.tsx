import React, {useContext, useRef, useState} from "react";
import "./SettingsName.scss"
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import {validUserName} from "../../Regex/Regex";
import classNames from "classnames";
import {modalContext} from "../../Context/ModalContext";

// Нужен рефакторинг классов
const SettingsName = () => {
    const NAME_ERROR = "The user name must contain at least 3 letters, numbers and underscores"

    const userID    = useContext(userContext).userID;
    const userName  = useContext(userContext).userName;
    const logIn     = useContext(userContext).logIn;
    const hideModal = useContext(modalContext).hideModal;

    const [nameInputValue, setNameInputValue] = useState(userName)
    const [errorMessage, setErrorMessage] = useState('')

    const nameInputDOM  = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validUserName.test(nameInputValue)) {
            setErrorMessage(NAME_ERROR);
            nameInputDOM.current!.focus();
        }
        else {
            const fetchData = async () => {
                const result = await axios(`http://localhost:3030/users/${userID}`)
                const user = {...result.data, name: nameInputValue}
                const response = await axios.put(`http://localhost:3030/users/${userID}`, user)
                logIn(user)
                hideModal()
            };
            fetchData();
        }
    };

    const nameFieldClass = classNames({
        "form-field": true,
        "form-field--error": errorMessage === NAME_ERROR,
    })

    return (
        <div>
            <div className="modal-window__main-title">
                Change name
            </div>
            <form onSubmit={handleSubmit} className="modal-window__auth-form auth-form">
                <label className={nameFieldClass}>
                    <span className="form-field__title">New name *</span>
                    <input ref={nameInputDOM} type="text" className="form-field__input" required value={nameInputValue} onChange={(event) => {
                        setNameInputValue(event.target.value)
                    }} />
                </label>
                {errorMessage && <div className="modal-window__error">{errorMessage}</div>}
                <button type="submit" className="auth-form__submit-button">Save new name</button>
            </form>
        </div>
    )
}

export default SettingsName