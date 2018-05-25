import React from 'react';
import { graphql, compose } from 'react-apollo';
import getCounter from '../apollo/graphql/getCounter';
import { ICounterState } from '../apollo/counter';
import { isUndefined } from 'util';

interface ICounterProps {
  counter: ICounterState;
}

class Counter extends React.Component<ICounterProps> {
  public render() {
    const { counter } = this.props;
    console.log(counter);
    const getCounter = () => (
      <React.Fragment>
        <h3>Current Counter: {counter.currentCount}</h3>
        <div>
          {/* <button className="counter-action-button" onClick={e => increment()}>Increment</button>
          <button className="counter-action-button" onClick={e => decrement()}>Decrement</button> */}
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
  graphql<{}, ICounterProps, {}, {}>(getCounter, {
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
