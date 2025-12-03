import Signup from "./Signup";
import Logo from "@/ui/Logo";
import Link from "next/link";
import { Shield, Tag, Truck } from "lucide-react";

export default function Auth() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="flex items-center overflow-hidden min-h-screen relative justify-center py-4 lg:p-8">
        <div className="absolute bottom-0 translate-y-1/2 left-0 -translate-x-1/2 rounded-full -z-20 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] opacity-30 bg-gradient-to-tr blur-3xl from-purple-500/60 to-primary/60" />
        <div className="w-full max-w-lg h-auto">
          <div className="flex justify-center mb-3">
            <Logo className="w-40 lg:w-40" />
          </div>
          <h1 className="text-center text-3xl lg:text-4xl font-[600] tracking-tight mb-1">
            Welcome to Surplus!
          </h1>
          <Signup />
          <p className="text-sm font-[400] text-center mt-4">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden   lg:flex items-center relative h-full min-h-screen justify-center overflow-hidden">
        <div className="absolute bottom-5 right-5 bg-white/50 backdrop-blur-2xl rounded-3xl p-5 shadow-xl border border-white/40 max-w-xs xl:max-w-md">
          <h1 className="mb-4 text-xl leading-tight text-slate-950 font-semibold">
            Benefits of Registering with NRIParts include:
          </h1>

          <div className="space-y-3">
            {/* Card 1 */}
            <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-slate-200/30 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="bg-primary/80 p-3 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Tag className="text-white" size={20} />
              </div>
              <p className="font-medium text-slate-900 text-sm xl:text-base">
                Preferred Pricing: 5% or $1,000 off
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-slate-200/30 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="bg-primary/80 p-3 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Truck className="text-white" size={20} />
              </div>
              <p className="font-medium text-slate-900 text-sm xl:text-base">
                Discounted Expedited Shipping Rates
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-slate-200/30 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="bg-primary/80 p-3 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <Shield className="text-white" size={20} />
              </div>
              <p className="font-medium text-slate-900 text-sm xl:text-base">
                Extended 45-Day Warranty
              </p>
            </div>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1718083272953-b171ae87b3d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Mobile Benefits Section - Below Form */}
      <div className="lg:hidden py-8 bg-gradient-to-b container mt-10 from-transparent to-primary/5">
        <div className="max-w-lg mx-auto">
          <h2 className="mb-8 text-xl font-semibold text-slate-950 text-center">
            Benefits of Registering with NRIParts:
          </h2>

          <div className="space-y-3">
            {/* Card 1 */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-primary p-2.5 rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="text-white" size={18} />
              </div>
              <p className="font-medium text-slate-900 text-sm">
                Preferred Pricing: 5% or $1,000 off
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-primary p-2.5 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="text-white" size={18} />
              </div>
              <p className="font-medium text-slate-900 text-sm">
                Discounted Expedited Shipping Rates
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="bg-primary p-2.5 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={18} />
              </div>
              <p className="font-medium text-slate-900 text-sm">
                Extended 45-Day Warranty
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
