import { TimerModeEnum } from './enums';
import { z } from 'zod';

// Todos

interface Todo {
    title: string;
    description: string;
    completed: boolean;
    id: string;
    targetPomodoro: number;
    completedPomodoro: number;
}

interface TodoFormData {
    title: string;
    description: string;
    targetPomodoro: number;
}

interface TodoActions {
    add: (formData: TodoFormData) => void;
    edit: (id: string, formData: TodoFormData) => void;
    remove: (id: string) => void;
    toggleState: (id: string) => void;
    clearAll: () => void;
    clearCompleted: () => void;
    restart: () => void;
    incrementPomodoro: (id: string) => void;
    find: (id: string) => Todo | undefined;
    reorder: (fromIndex: number, toIndex: number) => void;
}

export type { Todo, TodoActions, TodoFormData };

// Timer
interface TimerSettings {
    [TimerModeEnum.POMODORO]: number;
    [TimerModeEnum.SHORT_BREAK]: number;
    [TimerModeEnum.LONG_BREAK]: number;
}

export type { TimerSettings };

// Sign Up / Login Form Data Type For Validation
const LoginScheme = z.object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(1, 'Password cannot be empty'),
});

// Define a schema for email, password, and password confirmation
const SignUpSchema = z
    .object({
        email: z.string().email('Invalid email address.'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters.')
            .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
            .regex(/\d/, 'Password must contain at least one number.'),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords must match.',
        path: ['passwordConfirm'], // Set the error path to the confirmation field
    });

export { LoginScheme, SignUpSchema };
