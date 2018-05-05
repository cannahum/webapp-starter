import React from 'react';
import AsyncComp from './AsyncComp';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<AsyncComp/> tests', () => {
  test('Shows a loading indication when it mounts', () => {
    const wrapper = shallow(<AsyncComp/>);
    expect(wrapper.find('h1').text()).toBe('Loading...');
  });
});
