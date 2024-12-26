import { useEffect, useState } from "react";
import InputLogin from "../form/InputLogin";
import RememberMe from "../form/RememberMe";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import useAddData from "@/hooks/useAddData";
import AlertError from "./alert/AlertError";
import AlertSuccess from "./alert/AlertSuccess";
import Link from "next/link";
import { z } from "zod";
import apiClient from "@/utils/apiCLient";

export default function FormSection() {
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { mutation } = useAddData({ url: "/reset-password" });
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");

    try {
      const response = await apiClient.post("/api/v1/auth/forgot-password", {
        email,
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      localStorage.setItem("userEmail", value.email);
      await fetchData();
    },
    validatorAdapter: zodValidator,
  });

  useEffect(() => {
    setError(mutation.error?.response?.data?.data);
    setToken(mutation.data?.data?.debug?.token);
    setSuccess(mutation.data?.data?.message);
  }, [mutation.error, mutation.data]);

  return (
    <section className="flex-1 flex justify-center items-center sm:p-5 rounded-3xl bg-primary -mt-7 z-0">
      {error && <AlertError isData={error} setisData={setError} />}
      {success && (
        <AlertSuccess token={token} isData={success} setIsData={setSuccess} />
      )}
      <div className="flex w-full h-full max-w-[80%] lg:max-w-[70%] m-auto flex-col justify-center   ">
        <h2 className="text-center  sm:text-3xl text-2xl font-medium">
          Forgot Your Password?
        </h2>

        <p className="text-grey mt-3 text-center max-w-[90%] mx-auto text-sm sm:text-xl   font-medium">
          Enter your email address to receive the OTP code and reset your
          password.
        </p>
        <div className="max-w-[90%] lg:max-w-[75%] w-full mx-auto">
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <InputLogin
              validator={{
                onChange: z.string().email("Only email valid"),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: z.string().refine(
                  async (value) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return !value.includes("error");
                  },
                  {
                    message: "No 'error' allowed in email",
                  }
                ),
              }}
              className="mt-12 w-full"
              form={form}
              name="email"
              placeholder="Enter your email"
              type="email"
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  disabled={!canSubmit}
                  type="submit"
                  className="w-full mt-12 bg-secondary text-primary rounded-[30px] font-semibold py-3 sm:py-4 text-center"
                >
                  {isSubmitting
                    ? "Loading..."
                    : mutation.isPending
                      ? "Loading..."
                      : "Continue"}
                </button>
              )}
            </form.Subscribe>
          </form>
          <p className="font-medium mt-3 text-xs sm:text-sm text-center">
            Have Your Password?{" "}
            <Link href={"/auth"}>
              <span className="text-secondary">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
