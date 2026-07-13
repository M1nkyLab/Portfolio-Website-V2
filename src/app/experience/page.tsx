import Experience from "@/components/sections/Experience";
import Link from "next/link";
import { X } from "lucide-react";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-syedhaziq-surface font-body selection:bg-syedhaziq-gold/30 selection:text-syedhaziq-gold relative">
      <Link href="/" className="fixed top-8 right-8 z-50 p-3 bg-syedhaziq-bg text-syedhaziq-text rounded-full hover:bg-syedhaziq-gold hover:text-syedhaziq-bg transition-colors shadow-lg">
        <X size={24} />
      </Link>
      <Experience />
    </main>
  );
}
