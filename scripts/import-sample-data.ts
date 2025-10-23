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
    title: 'Getting Started with Next.js 15',
    description: 'Learn the fundamentals of Next.js 15 and how to build modern web applications with the latest features and improvements.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and efficient. In this comprehensive guide, we\'ll explore the key features and how to get started.',
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
            text: 'What\'s New in Next.js 15?',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'features',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'features-text',
            text: 'Some of the key improvements include better performance, enhanced developer experience, and new built-in optimizations.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'getting-started-nextjs-15',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    featured: true,
    categorySlug: 'life-in-spain', // Will be replaced with actual category reference
  },
  {
    _type: 'post',
    title: 'Building Scalable React Applications',
    description: 'Best practices and patterns for creating maintainable and scalable React applications that can grow with your team.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'As your React application grows, maintaining code quality and performance becomes increasingly important. Here are the essential patterns and practices you need to know.',
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
            text: 'Component Architecture',
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
            text: 'Designing your components with scalability in mind is crucial for long-term maintainability.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'building-scalable-react-applications',
    },
    publishedAt: '2024-01-20T14:30:00Z',
    featured: true,
    categorySlug: 'client-stories',
  },
  {
    _type: 'post',
    title: 'Modern CSS Techniques for Better UX',
    description: 'Explore advanced CSS techniques and modern approaches to create stunning user interfaces and better user experiences.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'CSS has evolved significantly over the years, and modern techniques can dramatically improve both developer experience and user interface quality.',
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
            text: 'CSS Grid and Flexbox',
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
            text: 'These powerful layout systems have revolutionized how we create responsive and flexible designs.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'modern-css-techniques-better-ux',
    },
    publishedAt: '2024-01-25T09:15:00Z',
    featured: false,
    categorySlug: 'interior-lifestyle',
  },
  {
    _type: 'post',
    title: 'TypeScript Best Practices for React',
    description: 'Learn how to effectively use TypeScript with React to build type-safe applications with better developer experience.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'TypeScript and React make a powerful combination for building robust applications. Here are the best practices you should follow.',
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
            text: 'Type Definitions',
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
            text: 'Proper type definitions are the foundation of a well-typed React application.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'typescript-best-practices-react',
    },
    publishedAt: '2024-01-30T16:45:00Z',
    featured: true,
    categorySlug: 'budget-relocation',
  },
  {
    _type: 'post',
    title: 'Performance Optimization Strategies',
    description: 'Comprehensive guide to optimizing your web applications for better performance and user experience.',
    content: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-text',
            text: 'Performance is crucial for user experience and SEO. Learn the most effective strategies to optimize your applications.',
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
            text: 'Code Splitting and Lazy Loading',
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
            text: 'These techniques can significantly reduce initial bundle size and improve loading times.',
            marks: [],
          },
        ],
      },
    ],
    slug: {
      _type: 'slug',
      current: 'performance-optimization-strategies',
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
