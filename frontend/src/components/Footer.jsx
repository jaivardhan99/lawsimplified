import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-deep-blue text-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gold-400 text-xl font-bold mb-2">LexEase — Law Simplified.</h3>
            <p className="text-sm text-gray-300">
              Law Simplified for Every Indian. Create legal documents, understand your rights, and connect with experts — all in one place.
            </p>
          </div>
          
          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="text-gray-300 hover:text-gold-400 transition duration-300">Docs Library</Link></li>
              <li><Link to="/insights" className="text-gray-300 hover:text-gold-400 transition duration-300">Insights</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-gold-400 transition duration-300">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold-400 transition duration-300">Contact</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-gold-400 transition duration-300">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-gold-400 transition duration-300">About Us</Link></li>
              <li><Link to="/lawyer-connect" className="text-gray-300 hover:text-gold-400 transition duration-300">Lawyer Connect</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-gold-400 transition duration-300">Disclaimer</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 space-y-3">
          <p>LexEase — Law Simplified.</p>
          <p>Docs Library · Insights · Pricing · Contact · Disclaimer · Privacy Policy · Terms of Service</p>
          <p>&copy; 2025 LexEase.</p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto">
            Disclaimer: LexEase provides information and templates for educational and documentation purposes only. It does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
