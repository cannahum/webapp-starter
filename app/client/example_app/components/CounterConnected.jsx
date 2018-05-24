import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route } from 'react-router-dom';
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
class Counter extends React.Component {
  render() {
    const {counter, actions: {increment, decrement}, history, match: {url}} = this.props;
    const getCounter = () => (
      <React.Fragment>
        <h3>Current Counter: {`${counter.counter}`}</h3>
        <div>
          <button className="counter-action-button" onClick={e => increment()}>Increment</button>
          <button className="counter-action-button" onClick={e => decrement()}>Decrement</button>
        </div>
      </React.Fragment>
    );
    return (
      <div>
        <h2>Counter Component</h2>
        {history.location.pathname !== `${url}/counter`
          ? (
            <div className="navigate-button">
              <p>With React Router, you can navigate to the connected counter component</p>
              <Link to={`${url}/counter`}>
                Navigate To Counter
              </Link>
            </div>
          )
          : null
        }
        <Route path={`${url}/counter`} component={() => getCounter()}/>
      </div>
    );
  }
}

export default withRouter(Counter);
