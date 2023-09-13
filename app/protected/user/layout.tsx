import { Suspense } from "react";
import Nav from "./nav";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen bg-gray-50">
      <Suspense fallback="...">
        {/* @ts-expect-error*/}
        <Nav />
      </Suspense>
      {children}
      <Footer />
    </section>
  );
}
