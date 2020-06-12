import AuthAPI, {AuthorizerMaker, AuthAPIProvider, GetAuthHeaders} from '../services/AuthAPI';
import  Resource from '../../common/services/Resource';
import General from '../../common';
import  KeyAuthorizer  from '../../auth/authorizers/KeyAuthorizer'
import  TokenAuthorizer  from '../../auth/authorizers/TokenAuthorizer'

const props = {
     resource : {},
     key : "test"
};
let options;

beforeAll(() => {
    options = {baseURL: "http://sample.com"}
});

  describe('Test AuthorizerMaker', () => {

    test('KeyAuthorizer instance created', ()=> {   
        jest.spyOn(General, 'GetItem').mockImplementation((key) => {
            if(key === 'auth.apikey')
                return '123';
            return null;
          });
        const authorize = AuthorizerMaker();
        expect(authorize).toBeInstanceOf(KeyAuthorizer);
    });

    test('TokenAuthorizer instance created', ()=> {
        jest.spyOn(General, 'GetItem').mockImplementation((key) => {
            if(key === 'token')
                return '123';
            return null;
          });
        const authorize = AuthorizerMaker();
        expect(authorize).toBeInstanceOf(TokenAuthorizer);
    });

    test('No instance created and returned null', ()=> {
        jest.spyOn(General, 'GetItem').mockReturnValue(null);
        const authorize = AuthorizerMaker();
        expect(authorize).toBeNull();
    })
});
  
  describe('Test AuthAPIProvider instance', () => {    
    test('AuthAPI instance created', ()=> {      
        const auth = AuthAPIProvider.create();
        expect(auth).toBeInstanceOf(AuthAPI);
    });
});

describe('Test constructions', () => {
    test('Resource passed in props is set', ()=> {
        props.resource = new Resource(options);  
        const auth = new AuthAPI(props);
        expect(auth.resource).toBe(props.resource);
    });
});

describe('Test fetch', () => {

    test('send request called', () => {
        Resource.prototype.sendRequest = jest.fn()
        props.resource = new Resource(options);  
        const auth = new AuthAPI(props);
        auth.fetch(options)
        expect(Resource.prototype.sendRequest).toHaveBeenCalled();
    });
});

describe('Test getScheme returns anything', () => {
  
    test('returns mocked schema', () => {
        Resource.prototype.sendRequest = jest.fn()
        props.resource = new Resource(options);  
        const auth = new AuthAPI(props);
        auth.getScheme();
        const opts = {
            type:"get",
            url : "/authorizationplugin/"
        }
        expect(Resource.prototype.sendRequest).toHaveBeenCalledWith(opts);
    });
});

describe('Test getPlatformSettings returns anything', () => {

        test('returns mocked platformsettings', () => {
            Resource.prototype.sendRequest = jest.fn()
            props.resource = new Resource(options);  
            const auth = new AuthAPI(props);
            auth.getPlatformSettings();
            const opts = {
                type:"get",
                url : "/platformsettings/"
            }
            expect(Resource.prototype.sendRequest).toHaveBeenCalledWith(opts);
    });

});

/*
describe('Test authorize api', () => {

    test('call authorize from authorizer', () => {
        KeyAuthorizer.prototype.authorize = jest.fn()
        props.resource = new Resource(options);  
        const auth = new AuthAPI(props);
        const authorizer = new KeyAuthorizer(props);
        auth.authorize(authorizer);
        expect(KeyAuthorizer.prototype.authorize).toHaveBeenCalled();
});
});*/