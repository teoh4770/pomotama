enum TimerStatusEnum {
    IDLE = 'idle',
    RUNNING = 'running',
}

enum TimerModeEnum {
    POMODORO = 'pomodoroDuration',
    SHORT_BREAK = 'shortBreakDuration',
    LONG_BREAK = 'longBreakDuration',
}

enum TodosFilterEnum {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

enum TodoFormMode {
    ADD_TODO = 'addTodo',
    EDIT_TODO = 'editTodo',
}

export { TimerStatusEnum, TimerModeEnum, TodosFilterEnum, TodoFormMode };
