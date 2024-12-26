"use client";
import React, { useState } from "react";
import InputField from "@/components/dashboard/c-level/InputField";
import TextAreaField from "@/components/dashboard/c-level/TextAreaField";
import ButtonSubmit from "@/components/dashboard/c-level/ButtonSubmit";
import Alert from "@/components/dashboard/c-level/AlertSuccess";
import apiClient from "@/utils/apiCLient";

export function AddDivisionForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [responsibility, setResponsibility] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
  }>({ title: "", message: "" });

  const generateAbbreviation = (name: string): string => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      // Jika hanya satu kata, ambil tiga huruf pertama
      return words[0].substring(0, 3).toUpperCase();
    } else {
      // Jika lebih dari satu kata, ambil huruf pertama dari setiap kata
      return words.map(word => word.charAt(0).toUpperCase()).join("");
    }
  };
  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const abbreviation = generateAbbreviation(name);

      const payload = {
        name,
        abbreviation,
        responsibility,
        description,
      };

      await apiClient.post("/api/v1/divisions", payload);

      setAlertData({
        title: "Division Added!",
        message: "The division has been successfully added.",
      });
    } catch (e) {
      console.error("Error adding division:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full overflow-x-auto p-7 bg-[#0D2735] mt-5 rounded-lg">
        {alertData.title && alertData.message && (
        <Alert
          title={alertData.title}
          message={alertData.message}
          onClose={() => setAlertData({ title: "", message: "" })}
        />
      )}
      
      <InputField
        id="name"
        label="Name Division"
        placeholder="Input name of the division"
        value={name}
        setValue={setName}
      />

      <TextAreaField
        id="description"
        label="Description"
        placeholder="Provide a brief description of this role or position"
        value={description}
        setValue={setDescription}
      />

      <TextAreaField
        id="responsibility"
        label="Responsibilities"
        placeholder="List the key responsibilities for this role"
        value={responsibility}
        setValue={setResponsibility}
      />

      <div className="w-full md:w-[50%] mx-auto relative">
        <ButtonSubmit onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Division"}
        </ButtonSubmit>
      </div>
    </section>
  );
}
