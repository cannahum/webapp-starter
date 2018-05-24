import React, { Component } from 'react';

export default class AsyncComp extends Component {
  constructor(props) {
    super(props);

    this.isUnmounted = false;

    this.state = {
      isLoading: false,
      isLoaded: false,
    }
  }

  componentWillMount() {
    this.loadComponent();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {isLoading, isLoaded} = this.state;
    return (
      <div>
        <h2>Async JSX Component</h2>
        <p>This is a JSX component that keeps its internal state</p>
        <p>It also uses async / await!</p>
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
          r(!this.isUnmounted);
        }, 1 * 1000);
      });
    };

    this.setState({
      isLoading: true,
    });

    const safeToChangeState = await t();

    if (safeToChangeState) {
      this.setState({
        isLoading: false,
        isLoaded: true
      })
    }
  }
}
