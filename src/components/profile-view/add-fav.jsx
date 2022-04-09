// import React from 'react';
// import { Card, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { Col, Row, Figure } from 'react-bootstrap';
// import axios from 'axios';

// function AddFavoriteMovies({ favoriteMoviesList }) {
//     const addFav = (id) => {
//         let token = localStorage.getItem('token');
//         let url = `/${localStorage.getItem('user')}/movies/${id}`;
//         axios.add(url, {
//             headers: { Authorization: `Bearer ${token}` },
//         })
//     }
//     return (
//         <Col xs={12} md={6} lg={3} key={movies._id} >
//             {/* <Figure>
//                 <Figure.Image src={movies.ImagePath} alt={movies.title} ></Figure.Image>
//                 <Figure.Caption></Figure.Caption>
//             </Figure> */}
//             <link to={`/movies/${movies._id}`} >
//                 <h4> {movies.title} </h4>
//             </link>
//             <button variant="secondary" onClick={() => addFav(movies._id)}></button>
//         </Col>
//     )
// }

// export class AddFavoriteMovies extends React.Component
