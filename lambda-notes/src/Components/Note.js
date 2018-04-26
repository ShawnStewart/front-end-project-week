import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './Content.css';
import './Note.css';

export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { note: {} };
  }

  componentDidMount() {
    this.getNote();
  }

  getNote = () => {
    axios
      .get(`http://localhost:3333/notes/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ note: response.data })
      })
      .catch(err => {
        console.log('Error fetching notes', err);
      });
  }

  handleEdit = () => {}

  handleDelete = () => {
    axios
      .delete(`http://localhost:3333/notes/${this.props.match.params.id}`)
      .then(response => {
        console.log('response', response);
      })
      .catch(err => {
        console.log('Error deleting note', err);
      });
  }
  
  render() {
    return(
      <div className='Content__Wrapper'>
        <div className='Content__Heading NoHeading'></div>
        <div className='Content ViewNote'>
          <div className='ViewNote__Title'><p className='NoMargin'>{this.state.note.title}</p></div>
          <div className='ViewNote__Content'><p className='NoMargin'>{this.state.note.content}</p></div>
          <div className='ViewNote__Buttons'>
            <NavLink to='/' className='ViewNote__Link'>
              <button className='ViewNote__Edit'>Edit</button>
            </NavLink>
            <NavLink to='/notes' className='ViewNote__Link' onClick={this.handleDelete}>
              <button className='ViewNote__Delete'>Delete</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}