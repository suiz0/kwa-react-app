import Language, {GetLanguage} from './language';
import User from './user';

export {GetLanguage, default as Language} from './language';

export default {
    User: User,
    GetLanguage: GetLanguage,
    name: 'models'
}