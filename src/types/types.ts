import { TimerModeEnum } from './enums';

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
