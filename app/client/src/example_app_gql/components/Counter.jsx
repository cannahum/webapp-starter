import React from 'react';
import { graphql, compose } from 'react-apollo';
import { isUndefined } from 'util';
import getCounter from '../apollo/graphql/getCounter';
import updateCounter from '../apollo/graphql/updateCounter';

class Counter extends React.Component {
  render() {
    const { counter, updateCounter } = this.props;
    const doUpdateCounter = (variables) => {
      updateCounter({
        variables,
      });
    };
    const getCounter = () => (
      <React.Fragment>
        <h3>Current Counter: {counter.currentCount}</h3>
        <div>
          <button className="counter-action-button" onClick={e => doUpdateCounter({ value: 1 })}>Increment</button>
          <button className="counter-action-button" onClick={e => doUpdateCounter({ value: -1 })}>Decrement</button>
        </div>
      </React.Fragment>
    );
    return (
      <div>
        <h2>Hello from Apollo Counter</h2>
        {getCounter()}
      </div>
    );
  }
}

export default compose(
  graphql(updateCounter, {
    name: 'updateCounter',
  }),
  graphql(getCounter, {
    props: ({ data }) => {
      if (!isUndefined(data)) {
        const { counter } = data;
        return {
          counter,
        };
      }
      throw Error('No data here.');
    }
  })
)(Counter);
