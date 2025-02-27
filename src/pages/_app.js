import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MyApp({ Component, pageProps }) {
  if (!clerkKey) {
    console.error("⚠ Clerk Publishable Key is missing!");
    return <p>⚠ Lỗi: Thiếu Clerk API Key</p>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
