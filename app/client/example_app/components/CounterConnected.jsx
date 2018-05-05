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
      increment: (x) => dispatch(increment(x)),
      decrement: (x) => dispatch(decrement(x)),
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Counter extends React.Component {
  render() {
    const {counter, actions: {increment, decrement}} = this.props;
    return (
      <div>
        <h2>Counter Component</h2>
        <h3>Current Counter: {`${counter.counter}`}</h3>
        <div>
          <button onClick={e => increment(1)}>Increment</button>
          <button onClick={e => decrement(1)}>Decrement</button>
        </div>
      </div>
    );
  }
}
