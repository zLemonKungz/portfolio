const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ""

export function asset(path: string) {
  // remove leading slash if any
  const clean = path.startsWith("/") ? path : "/" + path
  return BASE + clean
}
