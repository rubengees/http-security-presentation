const baseEnv = import.meta.env.BASE_URL
const base = new URL(baseEnv.endsWith("/") ? baseEnv : baseEnv + "/", location.href).href

export function baseUrl(path: string): URL {
  return new URL(path, base)
}
