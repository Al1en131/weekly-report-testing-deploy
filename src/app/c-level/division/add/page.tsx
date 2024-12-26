import React from "react";
import Navbar from "@/components/dashboard/Navbar";
import { AddDivisionForm } from "@/components/dashboard/c-level/AddDivisionForm";
import styles from "@/styles/border.module.css";

export default function AddDivisionPage() {
  return (
    <main>
      <Navbar title="Add Division" />
      <div className={`${styles.border_section}`}>
        <AddDivisionForm />
      </div>
    </main>
  );
}