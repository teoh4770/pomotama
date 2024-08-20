const moveCursorToTheEnd = (
    input: HTMLInputElement | HTMLTextAreaElement | null
) => {
    if (input) {
        input.setSelectionRange(input.value.length, input.value.length);
    }
};

export { moveCursorToTheEnd };
