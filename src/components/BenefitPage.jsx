import React from "react";
import { Plus, X, Stethoscope, Calendar, MenuIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const BenefitsPage = () => {
  return (
    <div className=" p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
        <p className="text-gray-500 text-sm">
          List out your top perks and benefits.
        </p>
      </div>

      {/* Perks and Benefits Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold mb-1">Perks and Benefits</h3>
            <p className="text-sm text-gray-500">
              Encourage more people to apply by sharing the attractive rewards
              and benefits you offer your employees
            </p>
          </div>
          <button className="flex items-center gap-2 text-indigo-600 text-sm">
            <Plus size={16} />
            Add Benefit
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Healthcare Benefit Card */}
          <Card className="p-4 relative">
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Stethoscope className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Full Healthcare</h4>
                <p className="text-sm text-gray-600">
                  We believe in thriving communities and that starts with our
                  team being happy and healthy.
                </p>
              </div>
            </div>
          </Card>

          {/* Vacation Benefit Card */}
          <Card className="p-4 relative">
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Unlimited Vacation</h4>
                <p className="text-sm text-gray-600">
                  We believe you should have a flexible schedule that makes
                  space for family, wellness, and fun.
                </p>
              </div>
            </div>
          </Card>

          {/* Skill Development Card */}
          <Card className="p-4 relative">
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MenuIcon className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skill Development</h4>
                <p className="text-sm text-gray-600">
                  We believe in always learning and leveling up our skills.
                  Whether it's a conference or online course.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Review Button */}
      <div className="flex justify-end">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Do a Review
        </button>
      </div>
    </div>
  );
};

export default BenefitsPage;
