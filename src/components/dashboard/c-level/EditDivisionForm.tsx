"use client";
import React, { useState, useEffect } from "react";
import InputField from "@/components/dashboard/c-level/InputField";
import TextAreaField from "@/components/dashboard/c-level/TextAreaField";
import ButtonSubmit from "@/components/dashboard/c-level/ButtonSubmit";
import Alert from "@/components/dashboard/c-level/AlertSuccess";
import apiClient from "@/utils/apiCLient";

export function EditDivisionForm({ divisionId }: { divisionId: string }) {
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
      return words[0].substring(0, 3).toUpperCase();
    } else {
      return words.map((word) => word.charAt(0).toUpperCase()).join("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/api/v1/divisions/${divisionId}`);
        const division = response?.data?.data;

        if (division) {
          setName(division.name ?? "");
          setDescription(division.description ?? "");
          setResponsibility(division.responsibility ?? "");
        }
      } catch (error) {
        console.error("Error fetching division data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [divisionId]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setIsLoading(true);

    const abbreviation = generateAbbreviation(name);

    const payload = {
      name,
      abbreviation,
      responsibility,
      description,
    };

    try {
      const response = await apiClient.put(`/api/v1/divisions/${divisionId}`, payload);

      if (response.status === 200) {
        setAlertData({
          title: "Division Updated!",
          message: "The division has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("API Error Response:", error);
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
              {isLoading ? "Loading..." : "Update Division"}
            </ButtonSubmit>
          </div>
    </section>
  );
}
