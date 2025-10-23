import { createClient } from '@sanity/client'

// Create client using environment variables from .env file
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const categories = [
  {
    _type: 'category',
    title: 'Client Stories',
    slug: {
      _type: 'slug',
      current: 'client-stories',
    },
    description: 'Real stories from our clients about their relocation journey to Spain',
    color: 'blue',
  },
  {
    _type: 'category',
    title: 'Life in Spain',
    slug: {
      _type: 'slug',
      current: 'life-in-spain',
    },
    description: 'Everything you need to know about living in Spain',
    color: 'green',
  },
  {
    _type: 'category',
    title: 'Budget & Relocation',
    slug: {
      _type: 'slug',
      current: 'budget-relocation',
    },
    description: 'Financial planning and relocation tips for moving to Spain',
    color: 'purple',
  },
  {
    _type: 'category',
    title: 'Interior & Lifestyle',
    slug: {
      _type: 'slug',
      current: 'interior-lifestyle',
    },
    description: 'Home design, interior inspiration, and lifestyle content',
    color: 'orange',
  },
]

const posts = [
  {
    _type: 'post',
    title: 'Finding Your Dream Home in Barcelona',
    description: 'A complete guide to navigating the Barcelona real estate market, from neighborhoods to legal requirements.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Barcelona offers an incredible variety of housing options, from historic apartments in the Gothic Quarter to modern penthouses overlooking the Mediterranean. This guide will help you navigate the market and find your perfect home.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'h2-text',
            text: 'Best Neighborhoods for Expats',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-text',
            text: 'Each neighborhood in Barcelona has its own unique character and advantages. Consider your lifestyle, budget, and priorities when choosing.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'finding-dream-home-barcelona',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    featured: true,
    categorySlug: 'life-in-spain',
  },
  {
    _type: 'post',
    title: 'Sarah\'s Relocation Success Story',
    description: 'How Sarah moved from London to Madrid with her family and found the perfect apartment in just 3 weeks.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Sarah and her family decided to relocate from London to Madrid for a better work-life balance. Here\'s how we helped them find their perfect home in just three weeks.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'h2-text',
            text: 'The Challenge',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-text',
            text: 'Sarah needed a 3-bedroom apartment near international schools, with a budget of €2,500/month, and they had to move within a month.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'sarah-relocation-success-story',
    },
    publishedAt: '2024-01-20T14:30:00Z',
    featured: true,
    categorySlug: 'client-stories',
  },
  {
    _type: 'post',
    title: 'Budget Planning for Your Spanish Move',
    description: 'Everything you need to know about the costs involved in relocating to Spain, from visas to property taxes.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Moving to Spain involves various costs beyond just the property price. This comprehensive guide breaks down all the expenses you need to consider.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'h2-text',
            text: 'Initial Costs Breakdown',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-text',
            text: 'From visa applications to property transfer taxes, here\'s what you can expect to pay when moving to Spain.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'budget-planning-spanish-move',
    },
    publishedAt: '2024-01-25T09:15:00Z',
    featured: false,
    categorySlug: 'budget-relocation',
  },
  {
    _type: 'post',
    title: 'Spanish Interior Design Trends 2024',
    description: 'Discover the latest interior design trends popular in Spanish homes, from Mediterranean minimalism to modern rustic.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Spanish interior design combines traditional Mediterranean elements with contemporary aesthetics. Here are the trends that are defining Spanish homes in 2024.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'h2-text',
            text: 'Mediterranean Minimalism',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-text',
            text: 'Clean lines, natural materials, and a focus on light and space characterize this popular trend.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'spanish-interior-design-trends-2024',
    },
    publishedAt: '2024-01-30T16:45:00Z',
    featured: true,
    categorySlug: 'interior-lifestyle',
  },
  {
    _type: 'post',
    title: 'The Johnson Family\'s Costa del Sol Adventure',
    description: 'How the Johnson family found their perfect villa on the Costa del Sol and adapted to Spanish coastal living.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'The Johnson family dreamed of coastal living in Spain. After months of searching, they found their perfect villa in Marbella. Here\'s their story.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'heading1',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'h2-text',
            text: 'The Search Process',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-text',
            text: 'Finding the right property on the Costa del Sol required patience and local knowledge. We visited over 20 properties before finding the perfect match.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'johnson-family-costa-del-sol-adventure',
    },
    publishedAt: '2024-02-05T11:20:00Z',
    featured: false,
    categorySlug: 'client-stories',
  },
]

async function importAllData() {
  try {
    console.log('🚀 Starting complete data import...')
    
    // Step 1: Import categories
    console.log('📁 Importing categories...')
    const createdCategories = []
    
    for (const category of categories) {
      const result = await client.create(category)
      createdCategories.push({
        ...result,
        slug: category.slug.current
      })
      console.log(`✅ Created category: ${category.title} (ID: ${result._id})`)
    }
    
    // Step 2: Import posts with category references
    console.log('📝 Importing posts...')
    
    for (const post of posts) {
      // Find the category ID for this post
      const category = createdCategories.find(c => c.slug === post.categorySlug)
      
      if (!category) {
        console.error(`❌ Category not found for post: ${post.title}`)
        continue
      }
      
      // Remove categorySlug and add proper category reference
      const { categorySlug, ...postData } = post
      const postWithCategory = {
        ...postData,
        categories: [
          {
            _type: 'reference',
            _ref: category._id
          }
        ]
      }
      
      const result = await client.create(postWithCategory)
      console.log(`✅ Created post: ${post.title} with category: ${category.title} (ID: ${result._id})`)
    }
    
    console.log('🎉 Complete data import finished successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Categories: ${createdCategories.length}`)
    console.log(`   - Posts: ${posts.length}`)
    
  } catch (error) {
    console.error('❌ Error importing data:', error)
  }
}

// Run the import if this script is executed directly
if (require.main === module) {
  importAllData()
}

export { importAllData }