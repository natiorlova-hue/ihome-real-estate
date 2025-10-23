import { createClient } from '@sanity/client'

// Create client directly with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const sampleProperties = [
  {
    _type: 'property',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
    price: 450000,
    location: 'Downtown District',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: 'apartment',
    status: 'for-sale',
    featured: true,
  },
  {
    _type: 'property',
    title: 'Luxury Family House',
    description: 'Spacious family home with large backyard and modern amenities.',
    price: 750000,
    location: 'Suburban Heights',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    propertyType: 'house',
    status: 'for-sale',
    featured: true,
  },
  {
    _type: 'property',
    title: 'Cozy Studio Apartment',
    description: 'Perfect starter apartment with modern finishes and great location.',
    price: 280000,
    location: 'Arts District',
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    propertyType: 'apartment',
    status: 'for-sale',
    featured: false,
  },
  {
    _type: 'property',
    title: 'Executive Condo',
    description: 'High-end condo with premium finishes and concierge service.',
    price: 650000,
    location: 'Financial District',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    propertyType: 'condo',
    status: 'for-rent',
    featured: true,
  },
  {
    _type: 'property',
    title: 'Charming Townhouse',
    description: 'Historic townhouse with character and modern updates.',
    price: 520000,
    location: 'Historic Quarter',
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    propertyType: 'townhouse',
    status: 'for-sale',
    featured: false,
  },
]

async function importSampleData() {
  try {
    console.log('Starting sample data import...')
    
    for (const property of sampleProperties) {
      const result = await client.create(property)
      console.log(`Created property: ${property.title} (ID: ${result._id})`)
    }
    
    console.log('Sample data import completed successfully!')
  } catch (error) {
    console.error('Error importing sample data:', error)
  }
}

// Run the import if this script is executed directly
if (require.main === module) {
  importSampleData()
}

export { importSampleData }
