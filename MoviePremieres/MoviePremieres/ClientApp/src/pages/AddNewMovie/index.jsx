import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { moviesActions } from '../../store/actions/moviesActions';

const ButtonWithTopMargin = styled(Button)`
  margin-top: 10px;
`;

const Div = styled.div`
  .DateInput {
    width: 92px;
  }
`;

class AddNewMovie extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
    this.addMovie = this.addMovie.bind(this);

    this.state = {
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
    };
  }

  onDateChange(date) {
    const dateValue = moment.utc({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    });
    this.setState({ premiereDate: dateValue });
  }

  addMovie() {
    const { addNewMovie } = this.props;
    const {
      title, premiereDate, imageUrl, filmwebUrl,
    } = this.state;

    addNewMovie({
      title, premiereDate, imageUrl, filmwebUrl,
    });

    this.setState({
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
    });
  }

  render() {
    const {
      title, premiereDate, premiereDateFocused, imageUrl, filmwebUrl,
    } = this.state;

    return (
      <div>
        <h1>Add new movie</h1>
        {imageUrl && <img className="small-image" src={imageUrl} alt="Movie" />}

        <form>
          <Form.Group controlId="addNewMovieTile">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <Form.Control.Feedback />
          </Form.Group>

          <Form.Group controlId="addNewMoviePremiereDate">
            <Form.Label>Premiere date</Form.Label>
            <Div>
              <SingleDatePicker
                onDateChange={this.onDateChange}
                date={premiereDate}
                focused={premiereDateFocused}
                onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
                isOutsideRange={() => false}
              />
            </Div>
          </Form.Group>

          <Form.Group controlId="addNewMovieImageUrl">
            <Form.Label>Image link</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              placeholder="Enter image link"
              onChange={e => this.setState({ imageUrl: e.target.value })}
            />
            <Form.Control.Feedback />
          </Form.Group>

          <Form.Group controlId="addNewMovieFilmwebUrl">
            <Form.Label>Filmweb link</Form.Label>
            <Form.Control
              type="text"
              value={filmwebUrl}
              placeholder="Enter filmweb link"
              onChange={e => this.setState({ filmwebUrl: e.target.value })}
            />
            <Form.Control.Feedback />
          </Form.Group>
        </form>
        <ButtonWithTopMargin variant="primary" type="submit" onClick={this.addMovie}>Add new movie</ButtonWithTopMargin>
      </div>
    );
  }
}

AddNewMovie.propTypes = {
  addNewMovie: PropTypes.func.isRequired,
};

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch),
)(AddNewMovie);
