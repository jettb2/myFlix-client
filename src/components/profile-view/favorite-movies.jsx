import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col, Row, Figure } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';

function FavoriteMovies({ favoriteMoviesList }) {
    const removeFav = { id } => {
        let token = localStorage.getItem('token');
        let url = `/${localStorage.getItem('user')}/movies/${id}`;
        axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <h2> Favorite Movies </h2>
                    </Col>
                </Row>
                <Row>
                    {favoriteMoviesList.map((ImagePath, Title) => {
                        return (
                            <Col xs={12} md={6} lg={3} key={movies._id} >
                                <Figure>
                                    <Figure.Image src={movies.ImagePath} alt={movies.title} ></Figure.Image>
                                    <Figure.Caption></Figure.Caption>
                                </Figure>
                                <link to={`/movies/${movies._id}`} >
                                    <h4> {movies.title} </h4>
                                </link>
                                <button variant="secondary" onClick={() => removeFav(movies._id)}> Remove Movie From List </button>
                            </Col>
                        )
                    })
                    }
                </Row>
            </Card.Body>

        </Card>
    )
}

export default FavoriteMovies