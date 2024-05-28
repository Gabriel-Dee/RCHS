"use client";
import MedicalReport from "@/app/components/reports/reports";
import { Button } from "@/registry/new-york/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <MedicalReport ref={componentRef} />
      <div className="flex justify-center mt-8">
        <Button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-500 text-white shadow hover:bg-blue-600"
        >
          Print Report
        </Button>
      </div>
    </div>
  );
}
