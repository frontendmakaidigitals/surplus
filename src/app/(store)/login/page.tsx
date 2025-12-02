import React from "react";
import Login from "./Login";
import Link from "next/link";

const Page = () => {
  return (
    <div className="  px-4 py-10 bg-gray-50 max-w-4xl w-full container ">
      <div className="grid md:grid-cols-2 place-items-center gap-8 ">
        <div className="">
          <Login />
        </div>

        {/* New Customers */}
        <div className="bg-white p-10 rounded-2xl shadow-md border flex flex-col justify-center text-center">
          <h2 className="text-3xl font-semibold ">New Customers?</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            Create a Free Account to unlock preferred pricing, discounted
            expedited shipping costs, and extended warranty.
          </p>

          <Link
            href="/register"
            className="block  mt-3 bg-primary hover:bg-primary/90 text-white py-3 rounded-md text-sm font-semibold"
          >
            CREATE A FREE ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
