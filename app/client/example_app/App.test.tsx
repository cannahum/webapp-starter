import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AsyncComp from './components/AsyncComp';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/';

configure({adapter: new Adapter()});

describe('<App/> tests', () => {
  test('The component gets rendered', () => {
    const app = TestUtils.renderIntoDocument(
      <Provider store={store}><App/></Provider>,
    ) as React.Component<any, any>;
    const appNode: Node | null = ReactDOM.findDOMNode(app);
    expect(appNode).toBeDefined();
  });

  test('<App/> has <AsyncComp/> inside', () => {
    const wrapper: ShallowWrapper<App> = shallow(<App/>);
    expect(wrapper.find(AsyncComp).length).toBe(1);
  });
});
