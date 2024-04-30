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

export { TimerStatusEnum, TimerModeEnum, TodosFilterEnum };
