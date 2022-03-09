import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    keypressCallBack(event) {
        console.log(event.key)
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallBack);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallBack);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="anonymous" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <Link to={`/movies/${Movie.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
                <button onClick={() => { onBackClick(); }}> back </button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
};