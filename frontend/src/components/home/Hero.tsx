import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 transition-colors duration-300"
    >
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="font-main text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Streamline Your Logistics
        </h1>

        <p className="font-body text-lg md:text-xl max-w-2xl mb-10 text-slate-600 dark:text-slate-300">
          Manage customs declarations, clients, and operations - all in one
          seamless dashboard.
        </p>

        <Button
          size="lg"
          className="bg-slate-900 font-2xl font-main dark:bg-slate-100 text-slate-100 dark:text-slate-900 hover:opacity-90 transition font-semibold"
        >
          <a href="/login">Get started</a>
        </Button>
      </div>
    </section>
  );
}
