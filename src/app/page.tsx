import Image from "next/image";
import VectorTimeline from "@/components/timeline";
import SmoothFollower from "@/components/SmoothFollowercursot";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="section pt-16 pb-20 sm:pt-24 sm:pb-28">
        <SmoothFollower/>
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-black/10 text-black/70 ring-1 ring-black/10 dark:bg-black/20 dark:text-white/80 dark:ring-white/10">
            <span>Octwave 2.0</span>
            <span aria-hidden>•</span>
            <span>Registration Open</span>
            <span aria-hidden className="hidden sm:inline">•</span>
            <span className="opacity-80">Organized by IEEE IAS, University of Moratuwa</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="octwave-gradient-text">Ride the Octwave 2.0</span> — Build the Future
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-black/80 dark:text-white/85 max-w-2xl mx-auto font-medium">
            Team-based AI/ML challenge solving real industry problems.
          </p>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-black/70 dark:text-white/80 max-w-2xl mx-auto">
            Work with a problem statement, apply practical AI/ML techniques, and collaborate with academia and industry to deliver impactful, feasible solutions.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#register" className="btn-primary">Register Now</a>
            <a href="#tracks" className="btn-ghost">Explore Tracks</a>
          </div>
        </div>
      </header>

      {/* Tracks */}
      <section id="tracks" className="section pb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold octwave-gradient-text">Tracks</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            { title: "AI & Data", desc: "ML, agents, and data products that matter." },
            { title: "Web & Cloud", desc: "Next-gen apps, DX tools, and cloud-native." },
            { title: "Sustainability", desc: "Tech for climate, energy, and society." },
          ].map((t) => (
            <div key={t.title} className="card p-5 text-black/80 dark:text-white/90">
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/70">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <VectorTimeline />
    

      {/* Prizes */}
      <section className="section pb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold octwave-gradient-text">Prizes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { place: "Grand Prize", amt: "$3,000" },
            { place: "Runner Up", amt: "$1,500" },
            { place: "Track Winners", amt: "$500 each" },
          ].map((p) => (
            <div key={p.place} className="card p-6">
              <p className="text-sm text-black/70 dark:text-white/70">{p.place}</p>
              <p className="mt-2 text-2xl font-bold text-black dark:text-white">{p.amt}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* CTA */}
      <footer id="register" className="section pb-24">
        <div className="card p-6 md:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">Ready to ride the Octwave 2.0?</h3>
          <p className="mt-2 text-black/70 dark:text-white/80">Register your team and start building.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a className="btn-primary" href="#">Register</a>
            <a className="btn-ghost" href="#">View Rules</a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-black/60 dark:text-white/60">Organized by IEEE Industry Applications Society, University of Moratuwa</p>
        <p className="mt-2 text-center text-xs text-black/60 dark:text-white/60">© {new Date().getFullYear()} Octwave 2.0</p>
      </footer>
    </div>
  );
}
