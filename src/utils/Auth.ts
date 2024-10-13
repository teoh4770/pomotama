import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './FirebaseSetup';

// Sign up
const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log('User signed up: ', user);
    } catch (error) {
        console.log('Error signing up: ', error);
    }
};

// Sign in
const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log('User signed in:', user);
    } catch (error) {
        console.error('Error signing in:', error);
    }
};

// Sign out
const logOut = async () => {
    try {
        await signOut(auth);
        console.log('User logged out.');
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

export { signUp, signIn, logOut };
