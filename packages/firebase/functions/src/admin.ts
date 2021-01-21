import {
    app
} from './config';


const addClaimToUser = async (uid: string, claim: string): Promise<void> => {
    await app.auth().setCustomUserClaims(uid, {
        [claim]: true
    });
}


export {
    addClaimToUser
};
// admin
//     .auth()
//     .setCustomUserClaims(uid, { admin: true })
//     .then(() => {
//         // The new custom claims will propagate to the user's ID token the
//         // next time a new one is issued.
//     });