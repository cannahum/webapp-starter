import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import AsyncComp from './components/AsyncComp';

configure({ adapter: new Adapter() });

describe('<App/> tests', () => {
  test('The component gets rendered', () => {
    const app = TestUtils.renderIntoDocument(
      <App/>,
    ) as React.Component<any, any>;
    const appNode: Node = ReactDOM.findDOMNode(app);
    expect(appNode).toBeDefined();
  });

  test('<App/> has <AsyncComp/> inside', () => {
    const wrapper: ShallowWrapper<App> = shallow(<App/>);
    expect(wrapper.find(AsyncComp)).toHaveLength(1);
  });
});
