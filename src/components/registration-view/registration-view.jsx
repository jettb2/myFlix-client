import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, Birthday);
        /* Send a request to the server for authentication */
        axios.post('https://jett-flix-2.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: Birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                props.onRegistration(username);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            });

        /* then call props on registored user(username) */
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};