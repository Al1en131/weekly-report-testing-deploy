import React from "react";
import Navbar from "@/components/dashboard/Navbar";
import { EditDivisionForm } from "@/components/dashboard/c-level/EditDivisionForm";
import styles from "@/styles/border.module.css";

export default function EditDivisionId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main>
      <Navbar title={`Edit Division`} />
      <div className={`${styles.border_section}`}>
        <EditDivisionForm divisionId={id} />
      </div>
    </main>
  );
}
