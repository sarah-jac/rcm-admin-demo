export const checkValidity = (name: string, value: any, rules: any) => {
    let isValid = true;
    let isValue = value ? true : false;

    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = (value && value.trim() !== "" || isValue) && isValid;
        isValid ? (rules.error = "") : (rules.error = `${name} is required`);
    }
    if (rules.rejex && value) {
        const pattern = new RegExp(rules.rejex);
        isValid = pattern.test(value) && isValid;
        isValid
            ? (rules.error = "")
            : value.trim() === ""
                ? (rules.error = `${name} is required`)
                : (rules.error = `${name} is invalid`);
    }
    return isValid;
};