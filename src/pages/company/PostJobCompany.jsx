import React from "react";
import JobInformationCompany from "../../components/JobInformationCompany";
import SidebarCompany from "../../components/SidebarCompany";
import HeaderCompany from "../../components/HeaderCompany";
const PostJobCompany = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarCompany />
      <div className="flex flex-col h-screen w-screen overflow-y-auto">
        <div className="m-6">
          <HeaderCompany />
        </div>
        <JobInformationCompany />
      </div>
    </div>
  );
};

export default PostJobCompany;
