import Mediator from './services/Mediator';
import Resource from './services/Resource';
import withResources from './components/WithResources';
import AppProfile from './services/AppProfile';

export { Mediator, Resource , withResources, AppProfile};
export default {
    Resource: Resource,
    Mediator: Mediator,
    GetItem: (key: string): string | null => {
        return localStorage.getItem(key);
    },
    SetItem: (key: string, value: any) => {
        localStorage.setItem(key, value);
    },
    name: "General"
}