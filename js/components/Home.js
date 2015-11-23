import React, {Component} from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';

class Home extends Component {
  render() {
    const {title} = this.props;
    return (
      <main>
        <h1 className={styles.text}>Welcome {title}!</h1>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Change
        </button>
      </main>
    );
  }

  handleClick(e) {
    const {dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    actions.changeTitle(text);
    node.value = '';
  }

}

export default connect(state => state.Sample)(Home)
