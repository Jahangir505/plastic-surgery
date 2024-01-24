import { getSession } from "next-auth/react";

export default function withAuth(Component) {
  return function AuthenticatedRoute(props) {
    const { data: session, status } = getSession();

    if (status === "loading") {
      // Render loading spinner or something while checking authentication status
      return <p>Loading...</p>;
    }

    if (!session) {
      // Redirect to login page if user is not authenticated
      return <p>Redirecting to login...</p>;
    }

    // Render the protected component if the user is authenticated
    return <Component {...props} />;
  };
}
