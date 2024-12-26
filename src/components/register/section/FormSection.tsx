"use client";
import Image from "next/image";
import InputRegister from "../form/InputRegister";
import SelectRegister from "../form/SelectRegister";
import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import ImageInputIcon from "@/components/icons/ImageInputIcon";
import NumberInputRegister from "../form/NumberInputRegister";
import useRegister from "@/hooks/useRegister";
import { getDivisions } from "@/utils/apiDivision";
import Danger from "@/components/icons/Danger";
import ConfirmationPopup from "../notification/ConfirmationPopup";

interface FormValues {
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

interface DivisionValues {
  id: number;
  name: string;
}

export default function FormSection() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const { registerUser, loading } = useRegister();
  const [divisions, setDivisions] = useState<DivisionValues[]>([]);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const data = await getDivisions();
        console.log("API Response:", data.data);
        setDivisions(data.data);
      } catch (err) {
        console.error("Error fetching divisions:", err);
      }
    };

    fetchDivisions();
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setIsImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<FormValues>({
    onSubmit: async (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.value.first_name)
        errors.first_name = "First name is required";
      if (!values.value.last_name) errors.last_name = "Last name is required";
      if (!values.value.email) errors.email = "Email is required";
      if (!values.value.number) errors.number = "Phone number is required";
      if (!values.value.linkedin) errors.linkedin = "LinkedIn link is required";
      if (!values.value.instagram)
        errors.instagram = "Instagram link is required";
      if (!values.value.password) {
        errors.password = "Password is required";
      } else if (values.value.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (!values.value.division_id)
        errors.division_id = "Division is required";

      if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        return;
      }

      try {
        await registerUser({
          first_name: values.value.first_name,
          last_name: values.value.last_name,
          email: values.value.email,
          number: values.value.number,
          password: values.value.password,
          linkedin: values.value.linkedin,
          instagram: values.value.instagram,
          division_id: values.value.division_id,
          profile_picture: imageSrc !== null ? imageSrc : "",
        });

        setAlertData({
          title: "Add Member Succes!",
          message: "Please check your email to receive the OTP code.",
        });
      } catch (e) {
        console.error("Error adding division:", e);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="bg-primary rounded-2xl relative w-full">
      {alertData.title && alertData.message && (
          <ConfirmationPopup
            title={alertData.title}
            message={alertData.message}
            onClose={() => setAlertData({ title: "", message: "" })}
          />
        )}
      <div className="relative max-lg:hidden">
        <div className="absolute top-1 left-10 max-lg:left-5">
          <Image
            alt="Logo CC"
            className="w-[120px] max-lg:w-28"
            height={100}
            width={100}
            src={"/assets/image/logo-full-cc.png"}
          />
        </div>
      </div>
      <div className="py-5 max-lg:py-5">
        <div className="flex max-lg:px-5 pt-14 max-lg:pt-0 md:justify-center pb-4 max-lg:border-b max-lg:border-white">
          <div className="text-center max-lg:pt-3 max-lg:text-start">
            <h1 className="text-2xl font-bold mb-1 max-lg:text-lg">Register</h1>
            <p className="max-lg:text-sm text-[#B3C4CE] max-lg:text-[#90A3BF]">
              Please fill out all required fields correctly
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="w-full"
        >
          <div className="flex gap-4 max-lg:block md:justify-between pt-4 px-10 max-lg:px-5 pb-2">
            <div className="w-2/12 pt-5 max-lg:pt-10 max-lg:pb-4 max-lg:w-full max-lg:px-8 max-lg:justify-center max-lg:items-center max-lg:flex">
              <label className="flex flex-col items-center justify-center w-52 max-lg:h-52 h-64 rounded-lg cursor-pointer bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-5">
                  {isImageSelected && imageSrc && (
                    <Image
                      id="selectedImage"
                      src={imageSrc}
                      alt="Selected Image"
                      className="w-52 max-lg:h-52 h-64 object-cover rounded-lg"
                    />
                  )}
                  {!isImageSelected && <ImageInputIcon />}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
            </div>
            <div className="w-5/12 max-lg:w-full">
              <div className="w-full flex justify-end max-lg:justify-center">
                <div className="w-full max-w-md">
                  <InputRegister
                    className="mt-5 w-full text-md"
                    label="First Name"
                    name="first_name"
                    placeholder="Enter your First Name"
                    type="text"
                    form={form}
                  />
                  {errorMessages.first_name && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.first_name}
                    </p>
                  )}
                  <InputRegister
                    className="mt-5 w-full text-md"
                    name="password"
                    label="Create Password"
                    placeholder="Enter your password"
                    type="password"
                    form={form}
                  />
                  {errorMessages.password && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.password}
                    </p>
                  )}
                  <InputRegister
                    className="mt-5 w-full text-md"
                    name="linkedin"
                    label="LinkedIn Account"
                    placeholder="Enter url LinkedIn Account"
                    type="url"
                    form={form}
                  />
                  {errorMessages.linkedin && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.linkedin}
                    </p>
                  )}
                  <NumberInputRegister
                    className="mt-5 w-full text-md"
                    name="number"
                    label="Phone Number"
                    form={form}
                  />
                  {errorMessages.number && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.number}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-5/12 max-lg:w-full">
              <div className="w-full flex justify-end max-lg:justify-center">
                <div className="w-full max-w-md">
                  <InputRegister
                    className="mt-5 w-full text-md"
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter your Last Name"
                    type="text"
                    form={form}
                  />
                  {errorMessages.last_name && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.last_name}
                    </p>
                  )}
                  <SelectRegister
                    label="Select Division"
                    name="division_id"
                    options={divisions.map((division: DivisionValues) => ({
                      value: division.id.toString(),
                      label: division.name,
                    }))}
                    form={form}
                    className="mt-5 w-full"
                  />
                  {errorMessages.division_id && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.division_id}
                    </p>
                  )}
                  <InputRegister
                    className="mt-5 w-full text-md"
                    name="instagram"
                    label="Instagram Account"
                    placeholder="Enter url Instagram Account"
                    type="url"
                    form={form}
                  />
                  {errorMessages.instagram && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.instagram}
                    </p>
                  )}
                  <InputRegister
                    className="mt-5 w-full text-md"
                    name="email"
                    placeholder="Enter your Email Address"
                    type="email"
                    label="Email Address"
                    form={form}
                  />
                  {errorMessages.email && (
                    <p className="text-red-500 flex gap-2 items-center mt-1 text-sm">
                      <Danger /> {errorMessages.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[315px] mt-8 bg-secondary text-primary rounded-[30px] font-semibold py-4 text-center hover:bg-opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </section>
  );
}
