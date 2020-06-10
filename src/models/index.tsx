import Language, {GetLanguage} from './language';
import UIPlugins, {GetUIPlugins} from './uiplugins';
import User from './user';

export {GetLanguage, default as Language} from './language';
export {GetUIPlugins, default as UIPlugins} from './uiplugins';

export default {
    User: User,
    GetLanguage: GetLanguage,
    GetUIPlugins: GetUIPlugins,
    name: 'models'
}