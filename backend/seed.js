import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Template from './models/Template.js'

dotenv.config()

const templates = [
  {
    name: 'Rent Agreement',
    category: 'Property',
    summary: 'Standard rental agreement for residential and commercial properties in India.',
    description: 'A comprehensive rental agreement template covering all essential terms and conditions for property rental in India.',
    templateContent: `RENTAL AGREEMENT

This Rental Agreement is made on [date] between:

LANDLORD:
Name: [landlord_name]
Address: [landlord_address]
Phone: [landlord_phone]

TENANT:
Name: [tenant_name]
Address: [tenant_address]
Phone: [tenant_phone]

PROPERTY:
Address: [property_address]
Type: [property_type]

TERMS AND CONDITIONS:
1. The tenant agrees to pay a monthly rent of ₹[rent_amount] on or before the [rent_due_date] of each month.
2. The security deposit is ₹[security_deposit] which will be refunded upon termination of this agreement.
3. The tenancy period is from [start_date] to [end_date].
4. The tenant shall use the property only for residential/commercial purposes.
5. The tenant shall maintain the property in good condition.
6. The landlord has the right to inspect the property with reasonable notice.

This agreement is governed by the laws of India.

Landlord Signature: _________________ Date: ___________
Tenant Signature: _________________ Date: ___________`,
    fields: [
      { name: 'date', type: 'date', required: true, placeholder: 'Date of agreement' },
      { name: 'landlord_name', type: 'text', required: true, placeholder: 'Landlord full name' },
      { name: 'tenant_name', type: 'text', required: true, placeholder: 'Tenant full name' },
      { name: 'property_address', type: 'text', required: true, placeholder: 'Property address' },
      { name: 'rent_amount', type: 'number', required: true, placeholder: 'Monthly rent amount' }
    ],
    price: 299,
    isActive: true
  },
  {
    name: 'NDA',
    category: 'Business',
    summary: 'Non-disclosure agreement to protect confidential business information.',
    description: 'A standard NDA template for protecting confidential information in business relationships.',
    templateContent: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement is entered into on [date] between:

DISCLOSING PARTY:
Name: [disclosing_party]
Address: [disclosing_address]

RECEIVING PARTY:
Name: [receiving_party]
Address: [receiving_address]

1. CONFIDENTIAL INFORMATION
The Receiving Party agrees to maintain the confidentiality of all information disclosed by the Disclosing Party.

2. OBLIGATIONS
The Receiving Party shall:
- Not disclose confidential information to third parties
- Use confidential information only for the agreed purpose
- Return all confidential materials upon request

3. EXCEPTIONS
This agreement does not apply to information that is:
- Publicly known
- Independently developed
- Lawfully received from a third party

4. TERM
This agreement shall remain in effect for [duration] years from the date of signing.

Disclosing Party: _________________ Date: ___________
Receiving Party: _________________ Date: ___________`,
    fields: [
      { name: 'date', type: 'date', required: true, placeholder: 'Date of agreement' },
      { name: 'disclosing_party', type: 'text', required: true, placeholder: 'Disclosing party name' },
      { name: 'receiving_party', type: 'text', required: true, placeholder: 'Receiving party name' },
      { name: 'duration', type: 'number', required: true, placeholder: 'Duration in years' }
    ],
    price: 299,
    isActive: true
  }
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lexease')
    console.log('Connected to MongoDB')

    // Clear existing templates (optional)
    // await Template.deleteMany({})

    // Insert templates
    for (const template of templates) {
      const existing = await Template.findOne({ name: template.name })
      if (!existing) {
        await Template.create(template)
        console.log(`Created template: ${template.name}`)
      } else {
        console.log(`Template already exists: ${template.name}`)
      }
    }

    console.log('Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seed()

