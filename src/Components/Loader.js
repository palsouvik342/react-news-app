import React, { Component } from 'react';
import LoaderImg from './Ghost.gif';

export default class Loader extends Component {
  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
          <img src={LoaderImg} alt="Loader" />
      </div>
    )
  }
}
