import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full max-w-5xl mx-auto px-6 py-12 mt-12 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-zinc-500 font-light">
          © {new Date().getFullYear()} Nova Bit Software. Crafted with precision.
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer rounded-full transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer rounded-full transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer rounded-full transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
