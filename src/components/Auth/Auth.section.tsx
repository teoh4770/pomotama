import { useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Login } from './Login';
import { Register } from './Register';
import { AuthView } from '../../types/enums';
import { Button } from '../ui';

const Auth: React.FC = () => {
    const auth = getAuth();

    // Show: login / register view
    const [authView, setAuthView] = useState<AuthView>(AuthView.Login);

    // const [currentUser, setCurrentUser] = useState<User | null>(
    //     auth.currentUser
    // );

    const dialogRef = useRef<HTMLDialogElement | null>(null);

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
            <Button
                intent="secondary"
                size="small"
                type="button"
                aria-label="Login Button"
                onClick={() => dialogRef.current?.showModal()}
                className="flex items-center visible"
            >
                Sign In
            </Button>

            <dialog
                ref={dialogRef}
                className="dialog | box | text-center backdrop:bg-red-200 space-y-4"
            >
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-center text-black">
                        Pomotama
                    </h1>
                    <h2 className="text-xl font-bold leading-tight tracking-tight">
                        {authView === AuthView.Login
                            ? 'Login'
                            : 'Create Account'}
                    </h2>
                </div>

                <div className="bg-white py-1 px-2 rounded-xl">
                    {authView === AuthView.Login && (
                        <Login
                            authViewHandler={() =>
                                setAuthView(AuthView.Register)
                            }
                        />
                    )}

                    {authView === AuthView.Register && (
                        <Register
                            authViewHandler={() => setAuthView(AuthView.Login)}
                        />
                    )}
                </div>
            </dialog>
        </>
    );
};

export { Auth };
