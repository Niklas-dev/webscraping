import { getCookie, setCookie } from "cookies-next";

const getAccessToken = (): string | null => getCookie("access_token")!;
const getRefreshToken = (): string | null => getCookie("refresh_token")!;

const setAccessToken = (token: string): void =>
  setCookie("access_token", token);

interface RefreshTokenResponse {
  access_token: string;
}

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  if (response.ok) {
    const data: RefreshTokenResponse = await response.json();
    setAccessToken(data.access_token);
    return data.access_token;
  } else {
    throw new Error("Failed to refresh access token");
  }
};

const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response | null> => {
  let accessToken = getAccessToken();

  const modifiedOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(url, modifiedOptions);

  if (response.status === 401) {
    console.log("Refreshing token");
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    accessToken = await refreshAccessToken(refreshToken);

    (
      modifiedOptions.headers as Record<string, string>
    ).Authorization = `Bearer ${accessToken}`;
    response = await fetch(url, modifiedOptions);
  } else {
    console.log("Not refreshing token");
  }

  return response;
};

export default fetchWithAuth;
