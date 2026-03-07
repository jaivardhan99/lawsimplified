import { useState, useEffect } from 'react'
import { Search, FileText, ArrowRight, Home, User, Briefcase, ShoppingCart, Plus, Minus, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { manualFileMap as sharedManualFileMap } from '../utils/manualMap'

const Docs = () => {
  const [docs, setDocs] = useState([])
  const [filteredDocs, setFilteredDocs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  // Map specific document names to static PDF assets in public/asset-files
  const manualFileMap = sharedManualFileMap

  const openManual = (docName) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    const url = manualFileMap[docName]
    if (url) {
      window.open(url, '_blank')
    } else {
      console.warn('Manual not found for document:', docName)
    }
  }

  const openEditor = (docName) => {
    if (!user) {
      // Preserve intent to return to generator with selected doc
      const target = `/document-generator?doc=${encodeURIComponent(docName)}`
      navigate('/login', { state: { from: target } })
      return
    }
    navigate(`/document-generator?doc=${encodeURIComponent(docName)}`)
  }

  const categories = [
    { name: 'All', icon: <FileText className="w-5 h-5" /> },
    { name: 'Personal', icon: <User className="w-5 h-5" /> },
    { name: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Property', icon: <Home className="w-5 h-5" /> }
  ]

  const allDocs = [
    { _id: '1', name: 'Rent Agreement', category: 'Property', summary: 'Standard rental agreement for residential and commercial properties in India.', price: 299, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format' },
    { _id: '2', name: 'NDA', category: 'Business', summary: 'Non-disclosure agreement to protect confidential business information.', price: 299, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&auto=format' },
    { _id: '3', name: 'Service Agreement', category: 'Business', summary: 'Agreement between service providers and clients outlining terms and conditions.', price: 299, image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&auto=format' },
    { _id: '4', name: 'Partnership Agreement', category: 'Business', summary: 'Legal framework for business partnerships including profit sharing and responsibilities.', price: 399, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format' },
    { _id: '5', name: 'Sale Agreement', category: 'Property', summary: 'Property sale agreement template for real estate transactions.', price: 399, image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop&auto=format' },
    { _id: '6', name: 'Employment Contract', category: 'Business', summary: 'Employment terms and conditions agreement for employers and employees.', price: 299, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format' },
    { _id: '7', name: 'Will', category: 'Personal', summary: 'Last will and testament template for estate planning.', price: 399, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&auto=format' },
    { _id: '8', name: 'Power of Attorney', category: 'Personal', summary: 'Legal document authorizing someone to act on your behalf.', price: 299, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop&auto=format' },
    { _id: '9', name: 'Lease Agreement', category: 'Property', summary: 'Long-term lease agreement for property rentals.', price: 299, image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop&auto=format' },
    { _id: '10', name: 'Loan Agreement', category: 'Personal', summary: 'Formal agreement between a lender and borrower for loan terms.', price: 299, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop&auto=format' },
    { _id: '11', name: 'Franchise Agreement', category: 'Business', summary: 'Legal contract between franchisor and franchisee.', price: 499, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format' },
    { _id: '12', name: 'Non-Compete Agreement', category: 'Business', summary: 'Agreement preventing employees from competing with the company.', price: 299, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format' },
    { _id: '13', name: 'Gift Deed', category: 'Personal', summary: 'Legal document for gifting property or assets.', price: 299, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop&auto=format' },
    { _id: '14', name: 'Affidavit', category: 'Personal', summary: 'Sworn written statement of facts verified by oath.', price: 199, image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&auto=format' },
    { _id: '15', name: 'Joint Venture Agreement', category: 'Business', summary: 'Agreement between parties for a specific business project.', price: 499, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format' },
    { _id: '16', name: 'Memorandum of Understanding', category: 'Business', summary: 'Non-binding agreement outlining terms and understanding between parties.', price: 299, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&auto=format' },
    { _id: '17', name: 'Shareholders Agreement', category: 'Business', summary: 'Agreement governing relationships between company shareholders.', price: 499, image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop&auto=format' },
    { _id: '18', name: 'Consultancy Agreement', category: 'Business', summary: 'Contract between a consultant and client for professional services.', price: 299, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&auto=format' },
    { _id: '19', name: 'Property Transfer Deed', category: 'Property', summary: 'Legal document for transferring property ownership.', price: 399, image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=600&h=400&fit=crop&auto=format' },
    { _id: '20', name: 'Divorce Settlement', category: 'Personal', summary: 'Agreement on division of assets and responsibilities in divorce.', price: 499, image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&h=400&fit=crop&auto=format' },
    { _id: '21', name: 'Prenuptial Agreement', category: 'Personal', summary: 'Contract entered before marriage outlining asset division.', price: 399, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format' },
    { _id: '22', name: 'Child Custody Agreement', category: 'Personal', summary: 'Legal agreement on child custody arrangements.', price: 399, image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=400&fit=crop&auto=format' },
    { _id: '23', name: 'Commercial Lease', category: 'Property', summary: 'Lease agreement for commercial property rentals.', price: 349, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format' },
    { _id: '24', name: 'Supplier Agreement', category: 'Business', summary: 'Contract between a business and its supplier.', price: 299, image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format' },
    { _id: '25', name: 'Distribution Agreement', category: 'Business', summary: 'Agreement for distributing products or services.', price: 399, image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop&auto=format' }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setDocs(allDocs)
      setFilteredDocs(allDocs)
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    filterDocs()
  }, [searchQuery, selectedCategory, docs])

  const filterDocs = () => {
    let filtered = [...docs]

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredDocs(filtered)
  }

  const addToCart = (doc) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === doc._id)
      if (existingItem) {
        return prevCart.map(item =>
          item._id === doc._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { ...doc, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (docId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === docId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item._id === docId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      } else {
        return prevCart.filter(item => item._id !== docId)
      }
    })
  }

  const removeItemCompletely = (docId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== docId))
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Personal': return <User className="w-5 h-5" />
      case 'Business': return <Briefcase className="w-5 h-5" />
      case 'Property': return <Home className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Legal Documents Library</h1>
          <p className="text-xl text-gray-600">
            Browse our collection of legal document templates for India
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-300 relative z-10"
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center gap-2 justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
            <div
              className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-900">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item._id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <div className="flex gap-3 p-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-blue-900 text-sm">{item.name}</h3>
                                <button
                                  onClick={() => removeItemCompletely(item._id)}
                                  className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-blue-600">₹{item.price}</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => addToCart(item)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-blue-900">Total</span>
                        <span className="text-lg font-bold text-blue-900">₹{cartTotal}</span>
                      </div>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 py-3 rounded-lg font-bold transition duration-300">
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Documents Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No documents found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc, index) => {
              const cartItem = cart.find(item => item._id === doc._id)
              return (
                <div
                  key={doc._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Document Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                      {getCategoryIcon(doc.category)}
                      {doc.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{doc.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{doc.summary}</p>

                    {/* Price and Cart Controls */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">₹{doc.price}</span>
                      {cartItem ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(doc._id)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-full transition duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
                          <button
                            onClick={() => addToCart(doc)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-full transition duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(doc)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition duration-300"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditor(doc.name)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm font-semibold transition duration-300 text-center flex items-center justify-center gap-1"
                      >
                        <span>Start Draft</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openManual(doc.name)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-blue-900 px-3 py-2 rounded-lg text-sm font-semibold transition duration-300 text-center flex items-center justify-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Manual</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Docs
