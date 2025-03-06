import React from "react";
const BenefitsPage = ({ jobData, setJobData }) => {
  const perks = ["Full Healthcare", "Unlimited Vacation", "Skill Development"];

  return (
    <div className="p-6">
      <div className="mb-4">
        <label className="block text-gray-700">Perks & Benefits</label>
        <div className="flex flex-wrap gap-2">
          {perks.map(perk => (
            <button
              key={perk}
              className={`px-3 py-1 rounded ${jobData.perksAndBenefits.includes(perk) 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'}`}
              onClick={() => setJobData({
                ...jobData,
                perksAndBenefits: jobData.perksAndBenefits.includes(perk)
                  ? jobData.perksAndBenefits.filter(p => p !== perk)
                  : [...jobData.perksAndBenefits, perk]
              })}
            >
              {perk}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BenefitsPage ;