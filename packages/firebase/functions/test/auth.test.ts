/// <reference types="jest" />
import { fun } from './config';

import {
    addClaimToUser
} from '../src/admin';

describe('auth tests', () => {
    test('assign-claim', async () => {
        await addClaimToUser('XAVDmFW8Xdg5ALEzqzB9N8Vn0ma2', 'admin');
        return null;
    })
})