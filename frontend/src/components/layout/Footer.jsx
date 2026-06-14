import {
  BriefcaseBusiness,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <BriefcaseBusiness
                  size={20}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  AI Recruitment
                </h3>

                <p className="text-sm text-slate-400">
                  Smart Hiring Platform
                </p>
              </div>

            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              Transforming recruitment through AI-powered
              resume analysis, intelligent job matching,
              and interview preparation.
            </p>

          </div>

          {/* Product */}
          <div>

            <h4 className="font-semibold text-white">
              Product
            </h4>

            <ul className="mt-6 space-y-3 text-slate-400">

              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Integrations
                </a>
              </li>

            </ul>

          </div>

          {/* Resources */}
          <div>

            <h4 className="font-semibold text-white">
              Resources
            </h4>

            <ul className="mt-6 space-y-3 text-slate-400">

              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Career Guide
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>

            </ul>

          </div>

          {/* Social */}
          <div>

            <h4 className="font-semibold text-white">
              Connect
            </h4>

            <p className="mt-6 text-slate-400">
  Connect with us for smarter hiring solutions.
</p>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-slate-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-slate-500">
              © 2026 AI Recruitment Platform. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-500">

              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white">
                Terms of Service
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;