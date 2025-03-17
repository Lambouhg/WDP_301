// components/SocialLinksSection.js
import React from "react";
import { ArrowRight, Instagram, Twitter, Globe } from "lucide-react";

const SocialLinksSection = ({
  isEditing,
  instagram,
  setInstagram,
  twitter,
  setTwitter,
  website,
  setWebsite,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Social Links</h2>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="border rounded-md p-1"
            />
          ) : (
            <span className="text-sm text-blue-600">{instagram}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Twitter className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="border rounded-md p-1"
            />
          ) : (
            <span className="text-sm text-blue-600">{twitter}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-gray-400" />
          {isEditing ? (
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border rounded-md p-1"
            />
          ) : (
            <span className="text-sm text-blue-600">{website}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
