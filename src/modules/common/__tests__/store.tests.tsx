import actions from '../store/actions/AppProfileActions';

describe('Actions', ()=> {
    let dispatch;
    beforeEach(()=>{
        dispatch = jest.fn();
    });

    test('should create an action to update the lang property with setLang', async ()=>{
        const expectedAction = {
            type: "SET_LANG",
            lang: "esp"
        };

        actions.setLang("esp")(dispatch);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
    })

    test('should create an action to set loading property to true with startLoading', async ()=> {
        const expectedAction = {
            type: "START_LOADING"
        };

        actions.startLoading(dispatch);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    test('should create an action to set loading property to true with stopLoading', async ()=> {
        const expectedAction = {
            type: "STOP_LOADING"
        };

        actions.stopLoading(dispatch);
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });
});