export class FetchError extends Error {
  status: number | undefined;
  constructor(message?: string, status?: number) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
  }
}

export default async function fetchJSON(
  url: string | URL | globalThis.Request,
  init?: RequestInit
) {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new FetchError(res.statusText, res.status);
  }
  return res.json();
}
