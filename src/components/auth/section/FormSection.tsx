import { useEffect, useState } from "react";
import InputLogin from "../form/InputLogin";
import RememberMe from "../form/RememberMe";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import useAddData from "@/hooks/useAddData";
import Link from "next/link";
import { z } from "zod";
import Swal from "sweetalert2";
import { getToken, setTokenWithExpiration } from "@/utils/token";
import { redirectBasedRole } from "@/utils/redirectBasedRole";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";
import apiClient from "@/utils/apiCLient";

export default function FormSection() {
  const router = useRouter();
  const token = getToken();
  const [rememberme, setRememberme] = useState<boolean>(false);
  const { mutation } = useAddData({ url: "/login" });
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");

    try {
      const response = await apiClient.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      setData(response.data);

      const accessToken = response.data.access_token;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        setCookie("access_token", accessToken, { maxAge: 60 * 60 });

        const nextroute = redirectBasedRole(accessToken);
        console.log("Redirecting to:", nextroute);
        router.push(nextroute);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
  }, [router]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      localStorage.setItem("userEmail", value.email);
      localStorage.setItem("userPassword", value.password);
      await fetchData();
    },
    validatorAdapter: zodValidator,
  });

  useEffect(() => {
    if (mutation.error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Login failed. Please try again.",
      });
    }
  }, [mutation.error]);
  useEffect(() => {
    if (mutation.data) {
      console.log("Mutation Data:", mutation.data);

      const token = mutation.data.data?.authorization?.token;
      if (token) {
        setCookie("token", token, { maxAge: 60 * 60 });
        setTokenWithExpiration(mutation.data.data, 3600);
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "success",
          title: "Successfully logged in!",
        });

        const nextroute = redirectBasedRole(token);
        console.log("Redirecting to:", nextroute);
        router.push(nextroute);
      } else {
        console.error("Token not found in mutation data.");
      }
    }
  }, [mutation.data, router]);

  return (
    <section className="flex-1 flex justify-center items-center sm:p-5 rounded-t-3xl sm:py-10 bg-primary -mt-7 z-0">
      <div className="flex w-full h-full max-w-[80%] lg:max-w-[70%] m-auto flex-col justify-center">
        <h2 className="text-center  text-3xl font-medium max-lg:text-lg">
          Welcome to CC Weekly Report
        </h2>

        <p className="text-grey mt-3 text-center  text-xl   font-medium max-lg:text-sm">
          Login with your account to get started
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
                // onChange: z.string().email("Only email valid"),
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
              className="mt-12 w-full max-lg:mt-5 text-md"
              form={form}
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <InputLogin
              validator={{
                onChange: z.string().min(1),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: z.string().refine(
                  async (value) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return !value.includes("error");
                  },
                  {
                    message: "No 'error' allowed in password",
                  }
                ),
              }}
              className="mt-5 w-full max-lg: text-md"
              form={form}
              name="password"
              placeholder="Enter your password"
              type="password"
            />

            <div className="flex justify-between mt-5">
              <RememberMe
                rememberme={rememberme}
                setRememberme={setRememberme}
              />
              <Link href={"/auth/forget-password"}>
                <span className="text-sm text-secondary">Forgot Password?</span>
              </Link>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  disabled={!canSubmit}
                  type="submit"
                  className="w-full mt-12 bg-secondary text-primary rounded-[30px] font-semibold py-4 text-center max-lg:mt-6"
                >
                  {isSubmitting ? "..." : "Submit"}
                </button>
              )}
            </form.Subscribe>
          </form>
          <p className="font-medium mt-3 text-sm text-center max-lg:text-xs ">
            Don’t Have An Account?{" "}
            <Link href="auth/register" className="text-secondary">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
