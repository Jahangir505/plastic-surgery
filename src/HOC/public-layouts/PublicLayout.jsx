import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import Head from "next/head";
import "tailwindcss/tailwind.css";

export default function PublicLayout({ pageTitle, children }) {
  return (
    <div>
      <Head>
        <title>{pageTitle} | Plastic Edu Hub</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
