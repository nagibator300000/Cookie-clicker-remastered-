export function loadEnv(key: string) {
  const val = process.env[key]
  if (!val) {
    throw new Error(`Cant load var ${key}`)
  }
  return val
}
