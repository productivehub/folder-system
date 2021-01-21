# basic folder structure permissions manager
I wanted to build a platform agnostic solution, using K8S with mongodb, and a stateful volume for filesystem (could be used on a localhost, or remotely with cloud hosting). 
Unfurtunantly the time alloted for the task did not permit that. 

I opted to using Firebase / Angular instead, and basically work on it until I ran out of time. 
The solution is NOT COMPLETE!, I haven't gotten to work on the folder permissions, and/or file versioning. 


Security - in the little I managed to do there are two layers of security - checking the user's custom claim (is admin?), the second layer of security was written directly into the DB, so even if a user tried to call firestore directly they can't view information that they are not permitted to

To run it simply go into the `packages/firebase/web` folder and run it as an angular solution (I use `yarn`, so `yarn dev`)
