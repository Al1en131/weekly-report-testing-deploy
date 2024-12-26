"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VerifyOtp() {
  const [showModalVerify, setShowModalVerify] = useState(false);
  const [showModalResetCode, setShowModalResetCode] = useState(false);

  return (
    <div className="relative h-screen w-screen md:bg-primary">
      <div className="absolute inset-0 md:inset-5 ">
        <Image
          src="/assets/gif/login-show.gif"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="md:rounded-lg"
          alt="Login show gif"
        />
      </div>

      <div className="absolute p-4 top-0 md:top-2 left-0 md:left-5">
        <Image
          src="/assets/image/logo-full-cc.png"
          alt="Logo CC"
          className="w-32 h-20 md:w-36 md:h-20"
        />
      </div>

      <div className="relative flex items-center justify-center h-full">
        <div className="bg-primary text-white p-8 px-7 md:px-12 rounded-lg shadow-lg max-w-80 md:max-w-xl w-full">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-2 md:mt-3">
            Enter OTP Code
          </h1>
          <p className="text-center text-gray-300 mb-4 md:mb-6">
            Enter the 4-digit code sent to your email address.
          </p>

          <div className="flex justify-center gap-4 my-10">
            {[...Array(4)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="w-12 h-12 md:w-20 md:h-20 text-center text-2xl rounded-md bg-gray-200 text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}
          </div>

          <div className="flex justify-center items-center">
            <button
              className="w-full md:w-[80%] mx-auto py-3 bg-secondary text-blue-900 font-semibold rounded-full hover:bg-yellow-500 transition"
              onClick={() => setShowModalVerify(true)}
            >
              Verify
            </button>
          </div>

          <p className="text-center text-gray-300 mt-4 mb-2 text-sm md:text-base">
            Didn’t Receive The Code?{" "}
            <button
              className="text-yellow-400 hover:underline"
              onClick={() => setShowModalResetCode(true)}
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>

      {/* show modal verify */}
      {showModalVerify && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="relative bg-primary text-white rounded-lg shadow-lg md:max-w-md w-[90%] md:w-full p-6 md:py-10 border-2 border-secondary">
            <button
              className="absolute top-3 right-5 text-gray-300 hover:text-white"
              onClick={() => setShowModalVerify(false)}
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
                <Image
                  src="/assets/icon/success.png"
                  alt="Success Icon"
                  width={55}
                  height={55}
                />
              </div>
            </div>

            <h2 className="text-center text-2xl font-semibold">
              Password Reset Success
            </h2>

            <div className="py-3 md:py-2">
              <p className="text-center text-sm text-slate-400">
                Your new password is:
              </p>
              <div className="flex justify-center items-center gap-x-1">
                <p className="block font-mono text-lg font-bold mt-1">
                  th15izR4nD0OmNbR{" "}
                </p>
                <button>
                  <Image
                    src="/assets/icon/copy.png"
                    alt="Copy Icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>

            <div className="text-center mt-1 md:mt-6">
              <button
                className="bg-secondary text-primary px-6 py-2 rounded-full md:font-semibold hover:bg-secondary"
                onClick={() => setShowModalVerify(false)}
              >
                Access Your Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* show modal reset code  */}
      {showModalResetCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="relative bg-primary text-white rounded-lg shadow-lg md:max-w-md w-[90%] md:w-full p-6 py-10 border-2 border-secondary">
            <button
              className="absolute top-3 right-5 text-gray-300 hover:text-white"
              onClick={() => setShowModalResetCode(false)}
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
                <Image
                  src="/assets/icon/success.png"
                  alt="Success Icon"
                  width={55}
                  height={55}
                />
              </div>
            </div>

            <div className="my-4 mb-6">
              <p className="text-center text-xl md:text-2xl font-semibold">
                Password Reset Requested
              </p>
              <p className="text-center text-sm md:text-base text-slate-400">
                Please check your email to receive the OTP code
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                className="bg-secondary text-primary px-8 py-2 rounded-full text-sm md:text-base font-medium hover:bg-secondary"
                onClick={() => setShowModalResetCode(false)}
              >
                Enter OTP Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
