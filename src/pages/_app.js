import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ChatbaseWidget from "../components/ChatbaseWidget";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MyApp({ Component, pageProps }) {
  if (!clerkKey) {
    console.error("Thiếu Clerk");
    return <p>Lỗi r nè</p>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <ChatbaseWidget />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
