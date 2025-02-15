import React from "react";
import { FaBuilding, FaEnvelope, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Sidebar from '../../components/SidebarCompany';

const CompanyProfile = () => {
    // Dữ liệu công ty theo dạng mảng
    const companyInfo = {
        name: "Nomad",
        website: "https://nomad.com",
        logo: "https://storage.googleapis.com/a1aa/image/C_i3yv8tVuzyVoJ-RH9OLFUTa7cMt_my-7Yg8Ak5vik.jpg",
        description: "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure-from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.",
        contact: [
            { name: "Twitter", url: "https://twitter.com/Nomad", icon: <FaTwitter /> },
            { name: "Facebook", url: "https://facebook.com/NomadHQ", icon: <FaFacebook /> },
            { name: "LinkedIn", url: "https://linkedin.com/company/nomad", icon: <FaLinkedin /> },
            { name: "Email", url: "mailto:nomad@gmail.com", icon: <FaEnvelope /> },
        ],
        officeLocation: "Vietnam",
        team: [
            {
                name: "Célestin Gardinier",
                role: "CEO & Co-Founder",
                image: "https://storage.googleapis.com/a1aa/image/team1.jpg",
            },
            {
                name: "Reynaud Colbert",
                role: "Co-Founder",
                image: "https://storage.googleapis.com/a1aa/image/team2.jpg",
            },
            {
                name: "Arienne Lyon",
                role: "Managing Director",
                image: "https://storage.googleapis.com/a1aa/image/team3.jpg",
            },
        ],
        benefits: [
            {
                icon: "fas fa-heartbeat",
                title: "Full Healthcare",
                description: "We believe in thriving communities and that starts with our team being happy and healthy."
            },
            {
                icon: "fas fa-umbrella-beach",
                title: "Unlimited Vacation",
                description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun."
            },
            {
                icon: "fas fa-laptop-code",
                title: "Skill Development",
                description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course, we support our team's growth."
            },
        ],
        techStack: [
            { logo: "https://storage.googleapis.com/a1aa/image/o_oJ3ytjbIixxbvUy5_o9B1uNFcUFZNHhzd74x93T28.jpg", name: "HTML5" },
            { logo: "https://storage.googleapis.com/a1aa/image/u-BFPedpIYHRhUWGeVb15Z-vaQg2FgLx4q11datK-sU.jpg", name: "CSS3" },
            { logo: "https://storage.googleapis.com/a1aa/image/JHQi8GstW8VrDENIDEfCCLYn6BCjD-M6B2UDLci7mY0.jpg", name: "JavaScript" },
            { logo: "https://storage.googleapis.com/a1aa/image/gE6TQBVDRhUeJMkc6gK7Fayxh9NYZ9y72uRHnWfYdW8.jpg", name: "Ruby" },
            { logo: "https://storage.googleapis.com/a1aa/image/AgLwFlvQsmeKlX0eKhggwIZ_OmU9zn4R_-cq_0Ti4kc.jpg", name: "Mixpanel" },
            { logo: "https://storage.googleapis.com/a1aa/image/3Hyv5twMei7Fu1y3BGbYNqvbKbZdhsUSe809V99fga0.jpg", name: "Framer" },
        ],
        workingAt: [
            "https://storage.googleapis.com/a1aa/image/61u3qdAUFt9HtPMKsxe-lQHFAbMUu3mLFwxCPyCrsrg.jpg",
            "https://storage.googleapis.com/a1aa/image/IXk9mPDoqpvJ1K2meg6BtrrUPEzZOeuLYapS63pWGvQ.jpg",
            "https://storage.googleapis.com/a1aa/image/aqfFF-2mz7JiDZdTzmHTbHF2BNuhYVxH_MgHYjlS5l4.jpg",
            "https://storage.googleapis.com/a1aa/image/3wLycfo7tXIRBi_Tl-kryg0lUjFv9yoSk_8REZifDG4.jpg"
        ]
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />

            <div className="flex-1 p-8 grid grid-cols-12 gap-8">
                {/* Left Column (60%) */}
                <div className="col-span-12 md:col-span-8">
                    {/* Company Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <img
                                src={companyInfo.logo}
                                alt="Company logo"
                                className="w-16 h-16 rounded-lg"
                            />
                            <div className="ml-4">
                                <h1 className="text-3xl font-bold">{companyInfo.name}</h1>
                                <a href={companyInfo.website} className="text-blue-600 text-sm">
                                    {companyInfo.website}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">Public View</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">Profile Settings</button>
                        </div>
                    </div>

                    {/* Company Profile Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
                        <p className="text-gray-700">{companyInfo.description}</p>
                    </div>

                    {/* Contact Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Contact</h2>
                        <div className="flex space-x-6">
                            {companyInfo.contact.map((contact, index) => (
                                <a key={index} href={contact.url} className="text-blue-600 flex items-center space-x-2">
                                    {contact.icon} <span>{contact.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Working at Nomad Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Working at Nomad</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {companyInfo.workingAt.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Working at Nomad ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                                />
                            ))}
                        </div>
                    </div>


                    {/* Team Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Meet the Team</h2>
                        <div className="flex space-x-6">
                            {companyInfo.team.map((member, index) => (
                                <div key={index} className="flex flex-col items-center border p-4 rounded-lg">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <p className="mt-2 font-semibold">{member.name}</p>
                                    <p className="text-gray-500">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {companyInfo.benefits.map((benefit, index) => (
                                <div key={index} className="text-center border p-4 rounded-lg">
                                    <i className={`${benefit.icon} text-blue-600 text-3xl mb-2`}></i>
                                    <h3 className="font-semibold">{benefit.title}</h3>
                                    <p className="text-gray-500">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (40%) */}
                <div className="col-span-12 md:col-span-4">
                    {/* Tech Stack Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {companyInfo.techStack.map((tech, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
                                    <span>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Office Locations Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Office Locations</h2>
                        <p className="text-gray-700">{companyInfo.officeLocation}</p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CompanyProfile;
