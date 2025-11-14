import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Pricing = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(null)

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for exploring our platform',
      features: [
        'Access to document templates',
        'Chat help (basic queries)',
        'View document previews',
        'Community support'
      ],
      notIncluded: [
        'Document downloads',
        'Advanced features',
        'Lawyer consultation',
        'Priority support'
      ],
      buttonText: 'Get Started',
      buttonAction: 'free',
      popular: false
    },
    {
      name: 'Standard',
      price: '₹299',
      period: 'per document',
      description: 'Pay as you go for document generation',
      features: [
        'All Free features',
        'Guided document generation',
        'Download PDF/Word',
        'Email support',
        'Unlimited revisions'
      ],
      notIncluded: [
        'Lawyer consultation',
        'Priority support',
        'Bulk document generation'
      ],
      buttonText: 'Buy Now',
      buttonAction: 'standard',
      popular: true
    },
    {
      name: 'Pro',
      price: '₹499',
      period: 'per month',
      description: 'Unlimited access with premium features',
      features: [
        'All Standard features',
        'Unlimited document generation',
        'Lawyer consultation (1/month)',
        'Priority support',
        'Bulk document generation',
        'Advanced features',
        'Document storage'
      ],
      notIncluded: [],
      buttonText: 'Subscribe Now',
      buttonAction: 'pro',
      popular: false
    }
  ]

  const handlePayment = async (plan) => {
    if (!user) {
      alert('Please sign in to purchase a plan')
      return
    }

    setLoading(plan)

    try {
      let amount = 0
      if (plan === 'standard') {
        amount = 29900 // ₹299 in paise
      } else if (plan === 'pro') {
        amount = 49900 // ₹499 in paise
      }

      if (amount === 0) {
        alert('Free plan is already active!')
        setLoading(null)
        return
      }

      const response = await axios.post('/api/payment', {
        amount,
        userId: user.uid,
        plan: plan === 'pro' ? 'subscription' : 'one-time'
      })

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: response.data.amount,
          currency: 'INR',
          name: 'LexEase',
          description: `${plan === 'pro' ? 'Pro Subscription' : 'Document Generation'}`,
          order_id: response.data.orderId,
          handler: async (response) => {
            const verifyResponse = await axios.post('/api/payment/verify', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan
            })

            if (verifyResponse.data.success) {
              alert('Payment successful!')
            } else {
              alert('Payment verification failed')
            }
          },
          prefill: {
            email: user.email,
            name: user.displayName || ''
          },
          theme: {
            color: '#0067ff'
          }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
        setLoading(null)
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment initialization failed')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-soft-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-lg p-8 relative border-2 transition-all duration-300 transform hover:scale-105 ${
                plan.popular 
                  ? 'border-gold-500 shadow-xl ring-2 ring-gold-500 ring-opacity-50' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold-500 text-deep-blue px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-deep-blue">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-600">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 opacity-50">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePayment(plan.buttonAction)}
                disabled={loading === plan.buttonAction}
                className={`w-full py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-deep-blue shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.buttonAction ? 'Processing...' : plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include secure payment processing via Razorpay
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan for your organization? <a href="/contact" className="text-primary-600 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pricing
