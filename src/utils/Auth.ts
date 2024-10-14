import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './FirebaseSetup';

export interface ICredentials {
    email: string;
    password: string;
}

const signUp = ({ email, password }: ICredentials) => {
    const userCredentialPromise = createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredentialPromise;
};

const signIn = ({ email, password }: ICredentials) => {
    const userCredentialPromise = signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredentialPromise;
};

const logOut = () => {
    return signOut(auth);
};

export { signUp, signIn, logOut };
