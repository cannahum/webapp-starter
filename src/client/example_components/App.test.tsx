import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import App from "./App";

describe('<App/> tests', () => {
  test('The component gets rendered', () => {
    const app = TestUtils.renderIntoDocument(
      <App/>
    ) as React.Component<any, any>;
    const appNode: Node = ReactDOM.findDOMNode(app);
    expect(appNode).toBeDefined();
  });
});