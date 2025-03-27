// components/AdditionalDetailsSection.js
import React from "react";
import { ArrowRight, Mail, Phone, Globe } from "lucide-react";

const AdditionalDetailsSection = ({
  isEditing,
  email,
  setEmail,
  phone,
  setPhone,
  languages,
  setLanguages,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Additional Details</h2>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-1 text-gray-700"
              disabled={true}
            />
          ) : (
            <span className="text-sm text-gray-700">{email}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-md p-1"
            />
          ) : (
            <span className="text-sm text-gray-600">{phone}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              value={languages} // Đảm bảo languages không undefined
              onChange={(e) =>
                setLanguages(
                  e.target.value.length <= 50 ? e.target.value : languages // Giới hạn độ dài tối đa là 50 ký tự
                )
              }
              className="border rounded-md p-1 w-full"
            />
          ) : (
            <span className="text-sm text-gray-600">{languages}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsSection;
