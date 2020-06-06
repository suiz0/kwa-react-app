import Mediator from './services/Mediator';
import Resource from './services/Resource';
import withResources from './components/WithResources';
import AppProfile from './services/AppProfile';

export { Mediator, Resource , withResources, AppProfile};
export default {
    Resource: Resource,
    Mediator: Mediator,
    GetItem: (key: string): string | null => {
        return sessionStorage.getItem(key);
    },
    SetItem: (key: string, value: any) => {
        sessionStorage.setItem(key, value);
    },
    RemoveItem: (key: string) => {
        sessionStorage.removeItem(key);
    }
}