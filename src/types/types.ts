// put the shared interface here

interface Todo {
    title: string;
    completed: boolean;
    id: string;
}

interface TodoFormData {
    title: string;
}

interface TodoActions {
    add: (formData: TodoFormData) => void;
    edit: (id: string, formData: TodoFormData) => void;
    remove: (id: string) => void;
    toggleState: (id: string) => void;
    clearAll: () => void;
    clearCompleted: () => void;
}

export type { Todo, TodoFormData, TodoActions };
