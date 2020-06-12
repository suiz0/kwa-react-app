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
    test('has sendRequest method', () => {
        const resource = new Resource(options);
        expect(resource.sendRequest).toBeDefined();
    });

    test('has mockData property set', () => {
        const data = {result: "uno"};
        Resource.mockData = data;

        expect(Resource.mockData).toBeDefined();
    });

    test('has timeout property set', ()=>{
        expect(Resource.timeout).toBeDefined();
        expect(Resource.timeout).toBeLessThanOrEqual(1000);
    });

    test('returns a Promise from send request method', () =>{
        const resource = new Resource(options);
        const ret = resource.sendRequest(options);
        expect(ret).toBeDefined();
        expect(ret && ret.then).toBeTruthy();
    });
});