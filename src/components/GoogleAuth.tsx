import { useGoogleAuth } from "../hooks/useGoogleAuth";

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentity {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      renderButton: (
        element: HTMLElement,
        options: Record<string, string>,
      ) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

export default function GoogleAuth() {
  const { buttonRef } = useGoogleAuth();
  return <div ref={buttonRef} />;
}
