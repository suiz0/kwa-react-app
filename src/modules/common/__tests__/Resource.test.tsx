import Resource from '../services/Resource';

let options;

beforeAll(() => {
    options = {baseURL: "http://sample.com"}
});

describe('Test constructions', () => {
    test('baseURL passed in options is set', ()=> {
        const resource = new Resource(options);
        expect(resource.baseURL).toBe(options.baseURL);
    });
});

describe('Test interface', () => {
    const resource = new Resource(options);
    
    test('has sendRequest method', () => {
        expect(resource.sendRequest).toBeDefined();
    });

    test('has mockData property set', () => {
        const data = {result: "uno"};
        Resource.mockData = data;

        expect(Resource.mockData).toBeDefined();
    });
});