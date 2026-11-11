const API_URL = import.meta.env.VITE_API_URL + "/auth/google";

export async function authGoogle(credential: unknown) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    throw new Error(`Error de autenticación: ${response.status}`);
  }

  return response.json();
}

export async function authMe() {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });

  if (response.status === 401) return null;
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GET /auth/me respondió ${response.status}: ${body}`);
  }

  const { user } = await response.json();
  return user;
}

export async function logOut() {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
