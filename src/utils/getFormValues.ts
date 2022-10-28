export const getFormValues = (form: Element | null) => {
    let values = {};

    if (form) {
        const formData = new FormData(form as HTMLFormElement);

        values = Object.fromEntries(formData)
    }

    return values;
};
