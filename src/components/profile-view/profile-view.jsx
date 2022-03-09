import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap'
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootsrap/Form';
import Button from 'react-bootsrap/Button';
import Card from 'react-bootsrap/Card';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdatedUser from './update-user';
import { Container } from 'react-bootstrap';
export function ProfileView({ movies })
const [user, setuser] = userState({
    Username: '',
    Email: '',
    FavoriteMovies: []
})

const favoriteMoviesList = movies.filter((movies) => {
    return user.favoriteMovies.includes(movies._id);
})

// const getUser () => {

// }

useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
        isMounted = false
    }
}, [])


return (
    <Container>
        <row>
            <col xs={12} sm={4} >
                <Card>
                    <Card.Body>
                        <UserInfo name={UserInfo.Username} email={user.Email} />
                    </Card.Body>
                </Card>
            </col>
            <col xs={12} sm={8}>
                <Card>
                    <Card.Body>
                        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
                    </Card.Body>
                </Card>
            </col>

        </row>
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />

    </Container>
);



