// import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { signIn } from '../../utils';

interface ILogin {
    authViewHandler: () => void;
}

const Login: React.FC<ILogin> = ({ authViewHandler }) => {
    // const auth = getAuth()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<{
        email: string;
        password: string;
        generic: string;
    }>({
        email: '',
        password: '',
        generic: '',
    });

    const loginHandler = async (email: string, password: string) => {
        // validate user inputs

        // authenticate
        try {
            await signIn({ email, password });

            // If success, then reset the values
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
        <div className="grid bg-black/10 max-w-sm mx-auto px-2 py-4 rounded-lg">
            <h2 className="text-xl font-bold leading-tight tracking-tight pb-4">
                Sign in to your account
            </h2>

            <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorMessages.email && (
                        <p className="text-red-400 mt-2 text-sm">
                            {errorMessages.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={password}
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessages.password && (
                        <p className="text-red-400 mt-2 text-sm">
                            {errorMessages.password}
                        </p>
                    )}
                </div>

                {/* place the firebase error here... */}
                {errorMessages.generic && (
                    <p className="text-red-400 mt-2 text-sm">
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
                        className="font-medium hover:underline"
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
