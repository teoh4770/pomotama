import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Login } from './Login';
import { Register } from './Register';
import { AuthView } from '../../types/enums';

const Auth: React.FC = () => {
    const auth = getAuth();

    // Show: login / register view
    const [authView, setAuthView] = useState<AuthView>(AuthView.Login);

    // const [currentUser, setCurrentUser] = useState<User | null>(
    //     auth.currentUser
    // );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // handle log in scenario
                console.log('log in!');
            } else {
                // User logged out
                // handle log out scenario: redirect user?
                console.log('log out!');
            }
        });

        // clean up subcription on component unmount
        return () => unsubscribe();
    }, [auth]);

    // const handleLogOut = async () => {
    //     try {
    //         await logOut();
    //         console.log('User logged out');
    //     } catch (error) {
    //         console.error(error as FirebaseError);
    //     }

    //     setCurrentUser(null);
    // };

    return (
        // need a wrapper for this "page"
        // note authview default view changed based on whether user have signed in
        // once user register or login, then close the popup
        <>
            {authView === AuthView.Login && (
                <Login authViewHandler={() => setAuthView(AuthView.Register)} />
            )}

            {authView === AuthView.Register && (
                <Register authViewHandler={() => setAuthView(AuthView.Login)} />
            )}
        </>
    );
};

export { Auth };
