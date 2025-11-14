import { Link } from 'react-router-dom'
import { ArrowRight, FileText, HelpCircle, Shield, Users, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Simplified Legal Documents',
      description: 'Generate and customize verified legal templates in minutes — without jargon.'
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Guided Process',
      description: 'Answer simple questions; we’ll handle the formatting and structure for you.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect with Experts',
      description: 'Need professional review? Reach out to trusted lawyers directly from the platform.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Stay Informed',
      description: 'Read short, easy-to-understand updates about legal changes, policies, and rights.'
    }
  ]

  const templates = [
    { name: 'Rent Agreement', category: 'Property', description: 'Ready-to-use residential and commercial templates.' },
    { name: 'NDA', category: 'Business', description: 'Secure your confidential information.' },
    { name: 'Service Agreement', category: 'Business', description: 'Define scope, payment, and deliverables clearly.' },
    { name: 'Partnership Deed', category: 'Business', description: 'Establish business partnerships smoothly.' },
    { name: 'Property Sale Agreement', category: 'Property', description: 'For transparent real-estate transactions.' },
    { name: 'Employment Contract', category: 'Business', description: 'Clearly define roles and terms.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-blue to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-soft-white mb-3">
              <span className="mr-2">⚖️</span> LexEase — Law, Simplified.
            </h1>
            <p className="text-2xl md:text-3xl text-gold-300 mb-4">Law Simplified for Every Indian.</p>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Create legal documents, understand your rights, and connect with experts — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="bg-gold-500 hover:bg-gold-600 text-deep-blue px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
              >
                Browse Legal Docs
              </Link>
              <Link
                to="/register"
                className="bg-white/10 hover:bg-white/20 text-soft-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 border border-white/30"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-soft-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-deep-blue">Why Choose LexEase?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-gold-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-gold-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-deep-blue">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Legal Documents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-deep-blue">Popular Legal Documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-l-4 border-primary-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-deep-blue">{template.name}</h3>
                  <span className="text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
                <Link
                  to={`/docs?docType=${encodeURIComponent(template.name)}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 transition duration-300"
                >
                  Create Document
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/docs"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition duration-300 group"
            >
              View All Templates
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-soft-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-deep-blue">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 'Pick a document type', icon: <FileText className="w-8 h-8 text-gold-600" /> },
              { step: 'Answer guided questions', icon: <HelpCircle className="w-8 h-8 text-gold-600" /> },
              { step: 'Instantly download a professional draft', icon: <ArrowRight className="w-8 h-8 text-gold-600" /> },
              { step: '(Optional) Consult a lawyer for review', icon: <Users className="w-8 h-8 text-gold-600" /> },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <p className="text-deep-blue font-medium">{item.step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">About LexEase</h2>
          <p className="text-gray-700 text-lg">
            LexEase helps individuals and small businesses handle legal tasks with confidence. No jargon. No hidden complexity. Just law — simplified.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-deep-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-16 h-16 text-gold-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">Trusted by Thousands of Indians</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join our community of individuals and businesses who have simplified their legal processes with LexEase
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400">10K+</div>
                <div className="text-gray-300">Documents Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400">5K+</div>
                <div className="text-gray-300">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400">50+</div>
                <div className="text-gray-300">Legal Templates</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

