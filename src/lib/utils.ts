const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ""

export function asset(path: string) {
  const clean = path.startsWith("/") ? path : "/" + path
  return BASE + clean
}
