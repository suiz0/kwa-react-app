import React from 'react';
import Bootstrap from '../components/Bootstrap';
import AppProfile from '../services/AppProfile';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

configure({adapter: new Adapter()});

global.fetch = jest.fn().mockImplementation(()=> {
    return Promise.resolve({json: ()=>Promise.resolve({})});
});

let component;
const options = {
    ready: jest.fn(),
    profile: new AppProfile(),
    config: {}
};

beforeEach(()=>{
    component = shallow(<Bootstrap {...options} />);
});

describe("Test Rendering", () => {
    

    test('renders without crashing', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('Test behaviors', ()=> {
    test('executes ready method once config is loaded', ()=>{
       expect(options.ready).toBeCalled();
    });
});
