export function loadEnv(key) {
    const val = process.env[key];
    if (!val) {
        throw new Error(`Cant load var ${key}`);
    }
    return val;
}
