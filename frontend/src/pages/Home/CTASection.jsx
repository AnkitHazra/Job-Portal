import { Link } from 'react-router-dom';
function CTASection() {
  return (
    <section className="bg-slate-950 px-6 pb-32 ">

      <div data-aos="zoom-in-down" className="mx-auto max-w-5xl rounded-[40px] border border-slate-800 bg-linear-to-br from-blue-950 to-violet-400 p-12 text-center text-white">

        <h2 className="text-4xl font-bold">
          Ready To Transform Hiring?
        </h2>

        <p className="mt-6 text-lg text-blue-100">
          Join recruiters and candidates already using AI
          to improve hiring outcomes.
        </p>

        <div data-aos="zoom-out-up" className="mt-10 flex flex-wrap justify-center gap-4">

          <Link to='/login' className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900">
            Get Started
          </Link>

          <a href="https://www.linkedin.com/in/hazraankit2005/" className="rounded-xl border border-white/30 px-6 py-3 font-semibold">
            Learn More
          </a>

        </div>

      </div>

    </section>
  );
}

export default CTASection;