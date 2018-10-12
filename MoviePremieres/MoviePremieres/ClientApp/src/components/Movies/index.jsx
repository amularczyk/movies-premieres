import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { moviesActions } from '../../store/actions/moviesActions';
import './styles.css';

class Movies extends Component {
    componentDidMount() {
        this.props.requestMovies();
    }

    render() {
        const { movies } = this.props;
        return (
            <div>
                <h1>Movies premieres</h1>
                <Table>
                    <thead>
                        <tr>
                            <th/>
                            <th>Title</th>
                            <th>Premiere</th>
                        </tr>
                    </thead>
                    <tbody>
                        { movies.map(movie =>
                            <tr key={movie.id}>
                                <td><img src={movie.imageUrl} /></td>
                                <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                                <td>{new Date(movie.premiereDate).toLocaleDateString("en-GB")}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch)
)(Movies);
