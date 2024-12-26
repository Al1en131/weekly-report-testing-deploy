import { useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "@/utils/apiCLient";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  password: string;
  linkedin?: string;
  instagram?: string;
  division_id: string;
  profile_picture?: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerUser = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<RegisterResponse>(
        "https://new-api-weekly-report-test-626859703852.asia-southeast2.run.app/api/v1/auth/register",
        data
      );

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          try {
            const errorData = JSON.parse(err.response.data);
            setError(
              errorData.password
                ? errorData.password.join(", ")
                : "An error occurred."
            );
            console.error("Response error:", errorData);
          } catch (parseError) {
            setError("An error occurred while parsing the error response.");
            console.error("Parsing error:", parseError);
          }
        } else if (err.request) {
          setError(
            "No response from the server. Please check your internet connection."
          );
          console.error("Request error:", err.request);
        } else {
          setError(err.message || "An error occurred in the request.");
          console.error("Error message:", err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
        console.error("Unexpected error:", err);
      } else {
        setError("An unknown error occurred.");
        console.error("Unknown error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
    success,
  };
};

export default useRegister;
