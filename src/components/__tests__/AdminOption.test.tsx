import React from 'react';
import AdminOption from '../AdminOption';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


let component;

describe('Rendering tests', () => {
    beforeEach(() =>{ component = shallow(<AdminOption />);});

    test('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });
})