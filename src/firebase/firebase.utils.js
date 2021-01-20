import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAPXq3ANVzXsixjexVR9H6AIG3K3W48F8w',
  authDomain: 'githubprofile-f62d8.firebaseapp.com',
  projectId: 'githubprofile-f62d8',
  storageBucket: 'githubprofile-f62d8.appspot.com',
  messagingSenderId: '155157478575',
  appId: '1:155157478575:web:c7291dd429c7a0e3fce85a',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
const gitprovider = new firebase.auth.GithubAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
gitprovider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithGithub = () => auth.signInWithPopup(gitprovider);

export default firebase;
