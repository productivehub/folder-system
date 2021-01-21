import * as serviceAccount from '../service-account.json';
import * as admin from 'firebase-admin';

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}


export const app = admin.apps.length > 0 && admin.apps[0] || admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`

});

export const db = admin.firestore(app);

export const storage = admin.storage(app);
export const bucket = storage.bucket(`gs://${serviceAccount.project_id}.appspot.com`);

const settings = { timestampsInSnapshots: true, ignoreUndefinedProperties: true };

db.settings(settings);
