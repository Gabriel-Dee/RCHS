"use client"
import React, { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const MedicalReport = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">In-Patient Discharge Summary</h1>
          <h2 className="text-lg">Patient’s Copy</h2>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-bold">Saint Elizabeth Hospital</h3>
          <div className="text-gray-200">Logo</div>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Patient Demographics</h3>
        <div className="grid grid-cols-3 gap-4 border-t border-b py-4">
          <div>
            <strong>Name:</strong> Celeste Lim
          </div>
          <div>
            <strong>Gender:</strong> Female
          </div>
          <div>
            <strong>Location:</strong> St Rita Ward
          </div>
          <div>
            <strong>ID No.:</strong> 1234565
          </div>
          <div>
            <strong>Date of Birth:</strong> March 9, 2015
          </div>
          <div>
            <strong>Nationality:</strong> Filipino
          </div>
          <div>
            <strong>Visit No.:</strong> 2021-9-9-022
          </div>
          <div>
            <strong>Age:</strong> 7 y, 8 mos
          </div>
          <div>
            <strong>Race:</strong> Chinese
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <strong>Allergies:</strong> N.A.
          </div>
          <div>
            <strong>Medical Alerts:</strong> N.A.
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2 bg-blue-500 text-white p-2 rounded">Medical / Surgical / Family History</h3>
        <div className="p-4 border rounded">
          <p><strong>Medical / Surgical Hx:</strong> N.A.</p>
          <p><strong>Family History:</strong> N.A.</p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Admission Details</h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-t">
              <td className="p-2"><strong>Admission Date / Time:</strong></td>
              <td className="p-2">September 8, 2021 / 22:00H</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Principal Doctor:</strong></td>
              <td className="p-2">Dr. Maxine Chan</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Reason for Admission:</strong></td>
              <td className="p-2">Vomiting and diarrhea</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Principal Diagnosis:</strong></td>
              <td className="p-2">A08.3 Gastroenteritis (Norovirus)</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Secondary Diagnosis:</strong></td>
              <td className="p-2">N.A.</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Other Diagnosis:</strong></td>
              <td className="p-2">N.A.</td>
            </tr>
            <tr className="border-t">
              <td className="p-2"><strong>Operation Procedures:</strong></td>
              <td className="p-2">N.A.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="mt-8 flex justify-between items-center text-sm">
        <span>1-800-765-7678 // 1500 San Pablo Street</span>
        <span>Page 1</span>
      </footer>
    </div>
  </div>
));

export default function App() {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <MedicalReport ref={componentRef} />
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}
