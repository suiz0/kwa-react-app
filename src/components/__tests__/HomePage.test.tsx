import React from 'react';
import HomePage from '../HomePage';
import { shallow , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let component;

test('renders without crashing', () => {
    component = shallow(<HomePage authUser={{authenticated:false}} />);
    expect(component).toMatchSnapshot();
});

describe('Composition tests', () => {

    beforeEach(()=> {
        component = shallow(<HomePage authUser={{authenticated:false}} />);
    });

    test('renders a div with bx--grid class', ()=> {
        expect(component.find("div.bx--grid")).toHaveLength(1);
    });

    test('renders page content', ()=> {
        const PageContent = <div className="bx--col">Home Page</div>
        expect(component.contains(PageContent)).toEqual(true);
    });
});
