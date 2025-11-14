import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Legal Updates', 'Business Law', 'Property Law', 'Personal Finance'];
  
  const articles = [
    {
      id: 1,
      title: 'Recent Changes in Indian Property Laws',
      excerpt: 'Understanding the latest amendments to property transfer regulations and their impact on buyers and sellers.',
      category: 'Property Law',
      author: 'Legal Team',
      date: '2023-10-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Starting a Business in India: Legal Requirements',
      excerpt: 'A comprehensive guide to the legal procedures and documentation needed to establish a business in India.',
      category: 'Business Law',
      author: 'Legal Team',
      date: '2023-10-10',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Understanding GST Compliance for Small Businesses',
      excerpt: 'Key compliance requirements and common pitfalls to avoid in GST filing for small businesses.',
      category: 'Business Law',
      author: 'Legal Team',
      date: '2023-10-05',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Tenant Rights in Indian Rental Agreements',
      excerpt: 'An overview of tenant protection laws and what renters should know before signing a lease.',
      category: 'Property Law',
      author: 'Legal Team',
      date: '2023-09-28',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Estate Planning: Why You Need a Will',
      excerpt: 'The importance of having a legally sound will and how to create one in India.',
      category: 'Personal Finance',
      author: 'Legal Team',
      date: '2023-09-20',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: 'Digital Signatures: Legal Validity in India',
      excerpt: 'Understanding the legal framework for digital signatures and their acceptance in official documents.',
      category: 'Legal Updates',
      author: 'Legal Team',
      date: '2023-09-15',
      readTime: '4 min read'
    }
  ];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-soft-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">Legal Insights</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest legal news and insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <div 
              key={article.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold bg-gold-100 text-gold-800 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to="#" 
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 transition duration-300 group"
                  >
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-deep-blue to-primary-900 rounded-2xl p-8 text-center">
          <BookOpen className="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-soft-white mb-2">Stay Legally Informed</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly legal insights and updates delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <button className="bg-gold-500 hover:bg-gold-600 text-deep-blue px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;