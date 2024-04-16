// put the shared interface here

interface Todo {
    title: string;
    completed: boolean;
    id: string;
    targetPomodoro: number;
    completedPomodoro: number;
}

interface TodoFormData {
    title: string;
    targetPomodoro: number;
}

interface TodoActions {
    add: (formData: TodoFormData) => void;
    edit: (id: string, formData: TodoFormData) => void;
    remove: (id: string) => void;
    toggleState: (id: string) => void;
    clearAll: () => void;
    clearCompleted: () => void;
    incrementPomodoro: (id: string) => void;
    find: (id: string) => Todo | undefined;
}

export type { Todo, TodoFormData, TodoActions };
