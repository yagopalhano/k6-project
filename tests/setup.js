import { gerarToken } from '../tests/common/getToken.js'
import { getKey } from './common/getKey.js';

export function TestsSetup(data) {
    let token = gerarToken(data);
    data.TOKEN = `Bearer ${token}`
    data.KEY = getKey(data)

    return data;
}