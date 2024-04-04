const moveCursorToTheEnd = (input: HTMLInputElement) => {
    input.setSelectionRange(input.value.length, input.value.length);
};

export { moveCursorToTheEnd };
