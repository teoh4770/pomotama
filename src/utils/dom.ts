const moveCursorToTheEnd = (input: HTMLInputElement | null) => {
    if (input) {
        input.setSelectionRange(input.value.length, input.value.length);
    }
};

export { moveCursorToTheEnd };
