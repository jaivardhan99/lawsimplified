import { Link } from 'react-router-dom'
import { ArrowRight, FileText, HelpCircle, Users, BookOpen, ChevronRight, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Intersection Observer hook for scroll-triggered animations
const useInView = (options = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target) // Only animate once
        }
      },
      { threshold: 0.15, ...options }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

const Home = () => {
  const [heroRef, heroVisible] = useInView()
  const [featuresRef, featuresVisible] = useInView()
  const [templatesRef, templatesVisible] = useInView()
  const [howItWorksRef, howItWorksVisible] = useInView()


  const features = [
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Simplified Legal Documents',
      description: 'Generate and customize verified legal templates in minutes — without jargon.'
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'AI-Powered Assistance',
      description: 'Our intelligent chatbot helps identify your legal needs and recommends the right document.'
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Connect with Experts',
      description: 'Need professional review? Reach out to trusted lawyers directly from the platform.'
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
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

  const steps = [
    { step: '01', title: 'Pick a Document', description: 'Choose from 25+ professional legal templates', icon: <FileText className="w-7 h-7" /> },
    { step: '02', title: 'Answer Questions', description: 'Simple guided form — no legal knowledge needed', icon: <HelpCircle className="w-7 h-7" /> },
    { step: '03', title: 'Download Draft', description: 'Get a professional PDF ready to use instantly', icon: <ArrowRight className="w-7 h-7" /> },
    { step: '04', title: 'Get Expert Review', description: 'Optionally consult a lawyer for verification', icon: <Users className="w-7 h-7" /> },
  ]

  return (
    <div className="min-h-screen page-enter">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-deep-blue via-primary-900 to-deep-blue py-20 md:py-28 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(0, 103, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(249, 224, 104, 0.2) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`text-center transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-soft-white mb-4 leading-tight">
              Law, <span className="gradient-text">Simplified.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gold-300/90 mb-4 font-light">
              Law Simplified for Every Indian.
            </p>
            <p className="text-base md:text-lg text-gray-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create legal documents, understand your rights, and connect with experts — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="group bg-gold-500 hover:bg-gold-400 text-deep-blue px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 active:scale-95 inline-flex items-center justify-center gap-2 pulse-glow"
              >
                Browse Legal Docs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/register"
                className="glass text-soft-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-white/15 active:scale-95 inline-flex items-center justify-center"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section ref={featuresRef} className="py-20 md:py-24 bg-soft-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">Why Choose LexEase?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to handle legal tasks with confidence — no jargon, no complexity.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-md p-7 hover-lift hover-shine border border-gray-100 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="bg-gradient-to-br from-gold-100 to-gold-200 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-gold-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-deep-blue">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Legal Documents */}
      <section ref={templatesRef} className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${templatesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">Popular Legal Documents</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Start with our most-used templates, trusted by thousands of Indians.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {templates.map((template, idx) => (
              <div
                key={idx}
                className={`group bg-white rounded-xl shadow-sm p-6 hover-lift border border-gray-100 hover:border-primary-200 transition-all duration-700 ${templatesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-deep-blue group-hover:text-primary-600 transition-colors duration-300">{template.name}</h3>
                  <span className="text-xs bg-gold-100 text-gold-800 px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-2">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-500 mb-4 text-sm">{template.description}</p>
                <Link
                  to={`/docs?docType=${encodeURIComponent(template.name)}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 group/link"
                >
                  Create Document
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 bg-deep-blue hover:bg-primary-800 text-soft-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              View All 25+ Templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-20 md:py-24 bg-soft-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-md mx-auto">Four simple steps from legal question to professional document.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 hover-lift group transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-xs font-bold text-primary-400 mb-3 tracking-widest">{item.step}</div>
                <div className="bg-gold-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 text-gold-700 group-hover:bg-gold-200 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-deep-blue font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.description}</p>

                {/* Connector arrow (hidden on last item and mobile) */}
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">About LexEase</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            LexEase helps individuals and small businesses handle legal tasks with confidence. No jargon. No hidden complexity. Just law — simplified.
          </p>
        </div>
      </section>

    </div>
  )
}

export default Home
