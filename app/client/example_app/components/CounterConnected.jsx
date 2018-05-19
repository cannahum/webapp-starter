import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../redux/actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement()),
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Counter extends React.Component {
  render() {
    const {counter, actions: {increment, decrement}} = this.props;
    return (
      <div id="counter-wrapper">
        <h2>Counter Component</h2>
        <h3>Current Counter: {`${counter.counter}`}</h3>
        <div>
          <button className="counter-action-button" onClick={e => increment()}>Increment</button>
          <button className="counter-action-button" onClick={e => decrement()}>Decrement</button>
        </div>
      </div>
    );
  }
}
