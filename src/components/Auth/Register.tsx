// import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { signUp } from '../../utils';
import { SignUpSchema } from '../../types/types';

interface IRegister {
    authViewHandler: () => void;
}

const Register: React.FC<IRegister> = ({ authViewHandler }) => {
    // const auth = getAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<{
        email: string[] | undefined;
        password: string[] | undefined;
        passwordConfirm: string[] | undefined;
        generic: string;
    }>({
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        generic: '',
    });

    const registerHandler = async (
        email: string,
        password: string,
        passwordConfirm: string
    ) => {
        // refresh errorMessages

        // validate user inputs
        // check email
        // check password size
        // check if password and password confirm match...
        const validationResult = SignUpSchema.safeParse({
            email,
            password,
            passwordConfirm,
        });

        // if not successful, return early
        if (!validationResult.success) {
            const errors = validationResult.error.format();
            console.log(errors.email, errors.password);

            setErrorMessages({
                ...errorMessages,
                email: errors.email?._errors,
                password: errors.password?._errors,
                passwordConfirm: errors.passwordConfirm?._errors,
            });

            return;
        } else {
            setErrorMessages({
                ...errorMessages,
                email: undefined,
                password: undefined,
                passwordConfirm: undefined,
            });
            console.log('validate success!');
        }

        // authenticate
        try {
            await signUp({ email, password });

            // If success, then reset the values
            setErrorMessages({
                ...errorMessages,
                generic: '',
            });
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
        } catch (error) {
            setErrorMessages({
                ...errorMessages,
                generic: 'Invalid Credentials...',
            });
            console.error(error);
        }
    };

    return (
        <div className="grid max-w-sm mx-auto px-2 py-6 rounded-lg">
            <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-left text-gray-900 "
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
                        className="block mb-2 text-sm font-medium text-left text-gray-900 "
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
                            errorMessages.password.map((message, i) => (
                                <p key={i}>{message}</p>
                            ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password-confirm"
                        className="block mb-2 text-sm font-medium text-left text-gray-900"
                    >
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="password-confirm"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={passwordConfirm}
                        placeholder="********"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />

                    <div className="text-sm text-red-400 space-y-1">
                        {errorMessages.passwordConfirm &&
                            errorMessages.passwordConfirm.map((message) => (
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
                    onClick={() =>
                        registerHandler(email, password, passwordConfirm)
                    }
                >
                    Create an account
                </button>

                <div className="text-sm font-light">
                    <span>Already have an account? </span>
                    <button
                        className="font-medium underline"
                        onClick={authViewHandler}
                    >
                        Login here
                    </button>
                </div>
            </form>
        </div>
    );
};

export { Register };
