export function loadEnv(key: string) {
  console.log(process.env);
  const val = process.env[key];
  if (!val) {
    throw new Error(`Cant load var ${key}`);
  }
  return val;
}
