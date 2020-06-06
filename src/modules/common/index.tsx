import Mediator from './services/Mediator';
import Resource from './services/Resource';
import withResources from './components/WithResources';
import Bootstrap from './components/Bootstrap';
import AppProfile from './services/AppProfile';
import Config, {load} from './services/Config';

export { Mediator, Resource , withResources, AppProfile, Config, load, Bootstrap};
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