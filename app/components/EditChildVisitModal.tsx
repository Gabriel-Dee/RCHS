"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "@/types/types"; // Make sure ActivityItem is defined in your types
import { Input } from "antd";

interface EditVisitModalProps {
  visit: ActivityItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVisit: ActivityItem) => void;
}

const EditVisitModal: React.FC<EditVisitModalProps> = ({
  visit,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ActivityItem>({ ...visit });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-3/4 overflow-y-auto">
        <h2 className="text-2xl mb-4">Edit Visit Information</h2>
        <form onSubmit={handleSubmit}>
          <table className="w-full table-auto border-collapse">
            <tbody className="block max-h-64 overflow-y-auto">
              {Object.keys(formData).map((key) => (
                <tr key={key} className="border-b flex flex-col">
                  <td className="p-2 text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, " ")}</td>
                  <td className="p-2">
                    <Input
                      type="text"
                      name={key}
                      value={(formData as any)[key]}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-rchs">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVisitModal;
