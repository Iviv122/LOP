let tokenCache: string | null | undefined;
const listeners = new Set<(token: string | null) => void>();

export function getAuthToken(): string | null {
    tokenCache = localStorage.getItem("token");
    return tokenCache;
}

export async function setAuthToken(token: string | null){
    tokenCache = token;

    if (token) {
        localStorage.setItem("token",token);
    } else {
        localStorage.removeItem("token")
    }

    listeners.forEach((listener) => {
        try {
            listener(token);
        } catch (error) {
            console.warn('Auth token listener failed', error);
        }
    });
}

export function removeAuthToken(){
    localStorage.removeItem("token")
}

export function subscribeToTokenChanges(listener: (token: string | null) => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}