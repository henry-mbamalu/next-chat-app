import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded)
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    return decoded.exp < currentTime; // Token is expired if exp < current time
  } catch (error) {
    return true; // Invalid token means expired
  }
};
