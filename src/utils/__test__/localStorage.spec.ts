import { describe, it, vi } from 'vitest';
import { TimerModeEnum, Todo } from '../../types';
import { storage } from '../localStorage';

// Keys
const TODOS_KEY = 'todos';
const SELECTED_TODO_ID_KEY = 'selectedTodoId';
const TIMER_SETTINGS_KEY = 'timerSettings';
const LONG_BREAK_INTERVAL_KEY = 'longBreakInterval';

describe('Storage', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    afterEach(() => {
        localStorage.clear();
        getItemSpy.mockClear();
        setItemSpy.mockClear();
    });

    describe('Todos storage', () => {
        describe('populate(todos)', () => {
            it('should populate todos to the storage.', () => {
                // arrange
                const todos: Todo[] = [
                    {
                        title: 'todo 1',
                        description: '',
                        completed: false,
                        id: '0',
                        targetPomodoro: 3,
                        completedPomodoro: 0,
                    },
                    {
                        title: 'todo 2',
                        description: 'something here',
                        completed: false,
                        id: '12',
                        targetPomodoro: 2,
                        completedPomodoro: 1,
                    },
                ];

                // act
                storage.todos.populate(todos);

                // assert
                expect(setItemSpy).toHaveBeenCalledWith(
                    TODOS_KEY,
                    JSON.stringify(todos)
                );
                expect(storage.todos.all()).toStrictEqual(todos);
            });
        });

        describe('all()', () => {
            it('should return an empty array if todos do not exist in the storage.', () => {
                // act
                const todos = storage.todos.all();

                // assert
                expect(todos).toHaveLength(0);
                expect(todos).toStrictEqual([]);
                expect(getItemSpy).toHaveBeenCalledWith(TODOS_KEY); // to assert that we are using the correct key 'todos' for retrieving the list
            });

            it('should retrieve all the todos from the storage.', () => {
                // arrange
                const todos: Todo[] = [
                    {
                        title: 'todo 1',
                        description: '',
                        completed: false,
                        id: '0',
                        targetPomodoro: 3,
                        completedPomodoro: 0,
                    },
                    {
                        title: 'todo 2',
                        description: 'something here',
                        completed: false,
                        id: '12',
                        targetPomodoro: 2,
                        completedPomodoro: 1,
                    },
                ];

                localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

                // act
                const todosFromStorage = storage.todos.all();

                // assert
                expect(todosFromStorage).toHaveLength(2);
                expect(todosFromStorage).toStrictEqual(todos);
                expect(getItemSpy).toHaveBeenCalledWith(TODOS_KEY);
            });
        });
    });

    describe('SelectedTodoId storage', () => {
        describe('get()', () => {
            it('should return selected todo id if selected todo id is found in storage.', () => {
                // arrange
                const selectedTodoId = '123';
                localStorage.setItem(SELECTED_TODO_ID_KEY, selectedTodoId);

                // act
                const selectedTodoIdFromStorage = storage.selectedTodoId.get();

                // assert
                expect(selectedTodoIdFromStorage).toBe(selectedTodoId);
                expect(getItemSpy).toBeCalledWith(SELECTED_TODO_ID_KEY);
            });

            it('should return an empty string if selected todo id is not found in storage.', () => {
                // act
                const selectedTodoIdFromStorage = storage.selectedTodoId.get();

                // assert
                expect(selectedTodoIdFromStorage).toBe('');
                expect(getItemSpy).toBeCalledWith(SELECTED_TODO_ID_KEY);
            });
        });

        describe('set()', () => {
            it('should set selected todo id to the storage.', () => {
                // arrange
                const selectedTodoId = '123';

                // act
                storage.selectedTodoId.set(selectedTodoId);

                // assert
                expect(setItemSpy).toHaveBeenCalledWith(
                    SELECTED_TODO_ID_KEY,
                    selectedTodoId
                );
                expect(localStorage.getItem(SELECTED_TODO_ID_KEY)).toBe(
                    selectedTodoId
                );
            });
        });
    });

    describe('Timer Setting storage', () => {
        describe('all()', () => {
            it('should return the default setting if timer setting is not found in storage.', () => {
                // arrange
                const DEFAULT_TIMER_SETTINGS = {
                    [TimerModeEnum.POMODORO]: 25,
                    [TimerModeEnum.SHORT_BREAK]: 5,
                    [TimerModeEnum.LONG_BREAK]: 20,
                };

                // act
                const timerSettings = storage.timerSettings.all();

                // assert
                expect(timerSettings).toStrictEqual(DEFAULT_TIMER_SETTINGS);
                expect(getItemSpy).toHaveBeenCalledWith(TIMER_SETTINGS_KEY);
            });

            it('should return the timer setting if timer setting is found in storage.', () => {
                // arrange
                const newTimerSettings = {
                    [TimerModeEnum.POMODORO]: 25,
                    [TimerModeEnum.SHORT_BREAK]: 5,
                    [TimerModeEnum.LONG_BREAK]: 20,
                };
                localStorage.setItem(
                    TIMER_SETTINGS_KEY,
                    JSON.stringify(newTimerSettings)
                );

                // act
                const timerSettings = storage.timerSettings.all();

                // assert
                expect(timerSettings).toStrictEqual(newTimerSettings);
                expect(getItemSpy).toHaveBeenCalledWith(TIMER_SETTINGS_KEY);
            });
        });

        describe('populate(timerSettings)', () => {
            it('should populate the timer setting in storage.', () => {
                // arrange
                const newTimerSettings = {
                    [TimerModeEnum.POMODORO]: 25,
                    [TimerModeEnum.SHORT_BREAK]: 5,
                    [TimerModeEnum.LONG_BREAK]: 20,
                };

                // act
                storage.timerSettings.populate(newTimerSettings);

                // assert
                expect(setItemSpy).toHaveBeenCalledWith(
                    TIMER_SETTINGS_KEY,
                    JSON.stringify(newTimerSettings)
                );
                expect(localStorage.getItem(TIMER_SETTINGS_KEY)).toStrictEqual(
                    JSON.stringify(newTimerSettings)
                );
            });
        });
    });

    describe('Long Break Interval storage', () => {
        const DEFAULT_LONG_BREAK_INTERVAL = 2;

        describe('get()', () => {
            it('should return default when the long break interval value is not found in storage.', () => {
                // act
                const longBreakInterval = storage.longBreakInterval.get();

                // assert
                expect(longBreakInterval).toBe(DEFAULT_LONG_BREAK_INTERVAL);
                expect(getItemSpy).toHaveBeenCalledWith(
                    LONG_BREAK_INTERVAL_KEY
                );
            });

            it('should return the long break interval when the value is found in storage', () => {
                // arrange
                const longBreakInterval = 1;
                localStorage.setItem(
                    LONG_BREAK_INTERVAL_KEY,
                    JSON.stringify(longBreakInterval)
                );

                // act
                const longBreakIntervalFromStorage =
                    storage.longBreakInterval.get();

                // assert
                expect(longBreakIntervalFromStorage).toBe(longBreakInterval);
                expect(getItemSpy).toHaveBeenCalledWith(
                    LONG_BREAK_INTERVAL_KEY
                );
            });
        });

        describe('set(longBreakInterval)', () => {
            it('should set the long break interval in the storage', () => {
                // arrange
                const longBreakInterval = 1;
                storage.longBreakInterval.set(longBreakInterval);

                // act
                const longBreakIntervalFromStorage = localStorage.getItem(
                    LONG_BREAK_INTERVAL_KEY
                );

                // assert
                expect(setItemSpy).toHaveBeenCalledWith(
                    LONG_BREAK_INTERVAL_KEY,
                    JSON.stringify(longBreakInterval)
                );
                expect(longBreakIntervalFromStorage).toBe('1');
            });
        });
    });
});
