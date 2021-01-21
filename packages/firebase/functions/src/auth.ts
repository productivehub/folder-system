/**
 * Copyright (c) ProductiveHub. All Rights Reserved.
 *
 *
 * @summary hooks for authentication actions
 * @author Segev {CJ} Shmueli <cj@segevs.com>
 *
 * Created: 1/18/2021
 */
import {
    db
} from './config';
import * as  functions from 'firebase-functions';
import { auth } from 'firebase-admin';


/**
 * will be called whenever a new user has sig   ned up
 */
const welcomeToDb = functions.auth.user().onCreate(async (user: auth.UserRecord) => {

    // we will just go ahead and create the user record in DB.
    return await db.collection('users').doc(user.uid).set({
        email: user.email,
        phoneNumber: user.phoneNumber,
        customClaims: user.customClaims,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
    })
});


export {
    welcomeToDb
};