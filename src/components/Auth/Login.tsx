// import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { signIn } from '../../utils';
import { LoginScheme } from '../../types/types';

interface ILogin {
    authViewHandler: () => void;
}

const Login: React.FC<ILogin> = ({ authViewHandler }) => {
    // const auth = getAuth()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<{
        email: string[] | undefined;
        password: string[] | undefined;
        generic: string;
    }>({
        email: undefined,
        password: undefined,
        generic: '',
    });

    const loginHandler = async (email: string, password: string) => {
        // validate user inputs
        const validationResult = LoginScheme.safeParse({
            email,
            password,
        });

        if (!validationResult.success) {
            const errors = validationResult.error.format();
            console.log(errors.email, errors.password);

            setErrorMessages({
                ...errorMessages,
                email: errors.email?._errors,
                password: errors.password?._errors,
            });

            return;
        } else {
            setErrorMessages({
                ...errorMessages,
                email: undefined,
                password: undefined,
            });
            console.log('validate success!');
        }

        // authenticate
        try {
            await signIn({ email, password });

            // If success, then reset the values
            setErrorMessages({
                ...errorMessages,
                generic: '',
            });
            setEmail('');
            setPassword('');
        } catch (error) {
            setErrorMessages({
                ...errorMessages,
                generic: 'Invalid Credentials...',
            });
            console.error(error);
        }
    };

    return (
        <div className="grid max-w-sm mx-auto px-2 py-4 rounded-lg">
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-left text-gray-900"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@flowbite.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-sm text-red-400 space-y-1">
                        {errorMessages.email &&
                            errorMessages.email.map((message, i) => (
                                <p key={i}>{message}</p>
                            ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium  text-left text-gray-900 "
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-sm text-red-400 space-y-1">
                        {errorMessages.password &&
                            errorMessages.password.map((message) => (
                                <p>{message}</p>
                            ))}
                    </div>
                </div>

                {/* place the firebase error here... */}
                {errorMessages.generic && (
                    <p className="text-sm text-red-400 mt-2">
                        {errorMessages.generic}
                    </p>
                )}

                <button
                    className="w-full border border-black rounded-lg py-2 bg-white"
                    onClick={() => loginHandler(email, password)}
                >
                    Login
                </button>

                <div className="text-sm font-light">
                    <span>Don't have an account yet? </span>
                    <button
                        className="font-medium underline"
                        onClick={authViewHandler}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export { Login };
