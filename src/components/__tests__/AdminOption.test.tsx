import React from 'react';
import AdminOption from '../AdminOption';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const i18nMock = {
    t: (str) => {
        return str;
    }
}

let component;

describe('Renderint tests', () => {
    beforeEach(() =>{ component = shallow(<AdminOption t={i18nMock.t} />);});

    test('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    
    });

    test('renders a link with href pointing to /login', ()=> {
        expect(component.find("Link[to='/login']")).toHaveLength(1);
    });
})