import { Users, Target, Lightbulb, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Integrity",
      description: "We believe in transparent, ethical practices and building trust with our users through honest communication."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accessibility",
      description: "Making legal documentation accessible to everyone, regardless of their legal knowledge or financial status."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Leveraging technology to simplify complex legal processes for Indian users."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User-Centric",
      description: "Putting our users at the center of everything we do, from product design to customer support."
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">About LexEase</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering Indians with accessible, affordable, and simplified legal documentation
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-deep-blue mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At LexEase, we're on a mission to democratize access to legal documentation in India. 
                We believe that everyone deserves access to proper legal documents without the barriers 
                of complexity, cost, or confusion.
              </p>
              <p className="text-gray-600">
                Our platform simplifies the creation of legal documents, making it possible 
                for individuals and small businesses to protect their rights and interests with 
                professionally drafted documents in minutes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-8 text-soft-white">
              <h3 className="text-xl font-bold mb-4">The Problem We Solve</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></span>
                  <span>High cost of legal services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></span>
                  <span>Complex legal language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></span>
                  <span>Time-consuming document creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></span>
                  <span>Lack of legal awareness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-deep-blue mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-deep-blue mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-deep-blue to-primary-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-soft-white mb-4">Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We're a passionate team of legal experts, technologists, and designers working together 
            to revolutionize legal documentation in India.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-500 rounded-full mx-auto mb-3 flex items-center justify-center text-deep-blue text-2xl font-bold">
                JD
              </div>
              <h3 className="font-semibold text-soft-white">John Doe</h3>
              <p className="text-gold-300 text-sm">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-500 rounded-full mx-auto mb-3 flex items-center justify-center text-deep-blue text-2xl font-bold">
                JS
              </div>
              <h3 className="font-semibold text-soft-white">Jane Smith</h3>
              <p className="text-gold-300 text-sm">Legal Director</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-500 rounded-full mx-auto mb-3 flex items-center justify-center text-deep-blue text-2xl font-bold">
                RP
              </div>
              <h3 className="font-semibold text-soft-white">Raj Patel</h3>
              <p className="text-gold-300 text-sm">CTO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
