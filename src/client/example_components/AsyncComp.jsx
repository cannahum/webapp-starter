import React from 'react';

export default class AsyncComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoaded: false,
    }
  }

  componentWillMount() {
    this.loadComponent();
  }

  render() {
    const {isLoading, isLoaded} = this.state;
    return (
      <div>
        {
          isLoaded
            ? <h1>I am Loaded!</h1>
            : null
        }
        {
          isLoading
            ? <h1>Loading...</h1>
            : null
        }
      </div>
    );
  }

  async loadComponent() {
    const t = () => {
      return new Promise((r) => {
        setTimeout(() => {
          r();
        }, 1 * 1000);
      });
    };

    this.setState({
      isLoading: true,
    });

    await t();

    this.setState({
      isLoading: false,
      isLoaded: true
    })
  }
}