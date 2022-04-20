import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import { connect } from 'react-redux';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar/navbar-view';

import { MovieCard } from '../movie-card/movie-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*export*/ class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            // movies: [],
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://jett-flix-2.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
                // Assign the result to the state
                // this.setState({
                //     movies: response.data
                // });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegistration(username) {
        console.log(username);
        this.setState({
            user: username
        });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    render() {
        // const { movies, user } = this.state;
        let { movies } = this.props;
        let { user } = this.state;
        console.log(movies, 'movie-view');

        return (
            <div className="main-view">
                <Router>
                    <NavbarView user={user} />
                    <Switch>

                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <MoviesList movies={movies} />; /*movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            )) */
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView onRegistration={username => this.onRegistration(username)} />
                            </Col>
                        }} />

                        <Route exact path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route exact path="/genres/:name" render={({ match }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            console.log(match.params.name, movies)
                            return <Col md={8}>
                                <GenreView movies={movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                            </Col>
                        }
                        } />

                        <Route exact path="/directors/:name" render={({ match, history }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView movies={movies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }
                        } />

                        <Route path={`/users/${user}`} render={({ history }) => {
                            if (!user) return <Redirect to="/" />
                            return <Col>
                                <ProfileView user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route path={`/profile/:Username`} render={({ history, match }) => {
                            if (!user) return <Redirect to="/profile" />
                            return <Col md={8}>
                                <ProfileView movies={movies} history={history} match={match} />
                            </Col>
                        }} />

                    </Switch>
                </Router >
            </div>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
