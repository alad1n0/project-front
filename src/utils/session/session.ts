import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export const getOrCreateSessionId = () => {
    let sessionId = Cookies.get('session');
    if (!sessionId) {
        sessionId = uuidv4();
        Cookies.set('session', sessionId, { expires: 7 });
    }
    return sessionId;
};