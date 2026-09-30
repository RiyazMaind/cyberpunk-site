export type ClassValue = string | false | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  let out = "";
  for (const input of inputs) {
    if (!input) continue;
    out = out ? `${out} ${input}` : input;
  }
  return out;
}
