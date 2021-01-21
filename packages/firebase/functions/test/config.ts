/// <reference types="jest" />

import * as firebaseTest from 'firebase-functions-test';
import { firebaseConfig } from 'firebase-functions';
import * as admin from 'firebase-admin';

const envConfig = {
};

const fun = firebaseTest({}, 'service-account.json');

fun.mockConfig(envConfig)

export { fun };