import About from "@/components/sections/About";
import Link from "next/link";
import { X } from "lucide-react";

export default function BackgroundPage() {
  return (
    <main className="min-h-screen bg-syedhaziq-gold text-syedhaziq-bg font-body selection:bg-syedhaziq-gold/30 selection:text-syedhaziq-gold relative">
      <Link href="/" className="fixed top-8 right-8 z-50 p-3 bg-syedhaziq-bg text-syedhaziq-text rounded-full hover:bg-syedhaziq-gold hover:text-syedhaziq-bg transition-colors shadow-lg">
        <X size={24} />
      </Link>
      <div className="pt-24">
        <About />
      </div>
    </main>
  );
}
