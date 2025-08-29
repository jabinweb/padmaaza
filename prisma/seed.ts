import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { rankSystem } from '@/lib/ranks'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Health & Wellness',
    description: 'Premium health and wellness products for optimal living'
  },
  {
    name: 'Beauty & Skincare',
    description: 'Natural and organic beauty products for radiant skin'
  },
  {
    name: 'Nutrition & Supplements',
    description: 'High-quality nutritional supplements and vitamins'
  },
  {
    name: 'Fitness & Sports',
    description: 'Performance products for active lifestyles'
  },
  {
    name: 'Personal Care',
    description: 'Daily essentials for personal hygiene and care'
  },
  {
    name: 'Home & Lifestyle',
    description: 'Premium products for modern living'
  }
]

const productTemplates = [
  // Health & Wellness
  { namePrefix: 'Organic', nameSuffix: ['Detox Tea', 'Green Tea', 'Herbal Blend', 'Immune Booster'] },
  { namePrefix: 'Natural', nameSuffix: ['Energy Drink', 'Wellness Tonic', 'Health Elixir', 'Vitality Boost'] },
  { namePrefix: 'Premium', nameSuffix: ['Superfood Powder', 'Antioxidant Complex', 'Immunity Support', 'Daily Greens'] },
  
  // Beauty & Skincare
  { namePrefix: 'Radiant', nameSuffix: ['Face Serum', 'Night Cream', 'Eye Cream', 'Moisturizer'] },
  { namePrefix: 'Glow', nameSuffix: ['Facial Cleanser', 'Toner', 'Face Mask', 'Exfoliator'] },
  { namePrefix: 'Youth', nameSuffix: ['Anti-Aging Cream', 'Collagen Serum', 'Wrinkle Reducer', 'Firming Lotion'] },
  
  // Nutrition & Supplements
  { namePrefix: 'Power', nameSuffix: ['Protein Powder', 'Multivitamin', 'Omega-3', 'Probiotics'] },
  { namePrefix: 'Elite', nameSuffix: ['Pre-Workout', 'BCAA Complex', 'Creatine Formula', 'Recovery Blend'] },
  { namePrefix: 'Pure', nameSuffix: ['Vitamin D3', 'Magnesium', 'Zinc Complex', 'B-Complex'] },
  
  // Fitness & Sports
  { namePrefix: 'Athletic', nameSuffix: ['Performance Drink', 'Energy Bar', 'Recovery Shake', 'Endurance Formula'] },
  { namePrefix: 'Sport', nameSuffix: ['Electrolyte Mix', 'Protein Bar', 'Hydration Pack', 'Energy Gel'] },
  
  // Personal Care
  { namePrefix: 'Fresh', nameSuffix: ['Body Wash', 'Shampoo', 'Conditioner', 'Deodorant'] },
  { namePrefix: 'Pure', nameSuffix: ['Toothpaste', 'Mouthwash', 'Hand Sanitizer', 'Body Lotion'] },
  
  // Home & Lifestyle
  { namePrefix: 'Eco', nameSuffix: ['Cleaning Spray', 'Laundry Detergent', 'Dish Soap', 'Air Freshener'] },
  { namePrefix: 'Smart', nameSuffix: ['Essential Oil', 'Diffuser Blend', 'Room Spray', 'Candle'] }
]

const healthDescriptions = [
  'Boost your immune system naturally with this powerful blend of organic ingredients.',
  'Experience enhanced vitality and energy with our premium formulation.',
  'Support your wellness journey with this scientifically-backed supplement.',
  'Detoxify and rejuvenate your body with natural, plant-based ingredients.',
  'Maintain optimal health with this carefully crafted nutritional supplement.'
]

const beautyDescriptions = [
  'Transform your skin with this luxurious, age-defying formula.',
  'Achieve radiant, youthful-looking skin with natural ingredients.',
  'Nourish and protect your skin with this premium skincare solution.',
  'Experience the power of nature in this scientifically-formulated product.',
  'Reveal your natural beauty with this gentle yet effective treatment.'
]

const fitnessDescriptions = [
  'Fuel your workouts and achieve peak performance with this advanced formula.',
  'Support muscle recovery and growth with premium quality ingredients.',
  'Enhance your athletic performance and endurance naturally.',
  'Optimize your fitness journey with this scientifically-designed supplement.',
  'Power through your workouts with sustained energy and focus.'
]

const getRandomDescription = (categoryName: string): string => {
  switch (categoryName.toLowerCase()) {
    case 'health & wellness':
    case 'nutrition & supplements':
      return faker.helpers.arrayElement(healthDescriptions)
    case 'beauty & skincare':
    case 'personal care':
      return faker.helpers.arrayElement(beautyDescriptions)
    case 'fitness & sports':
      return faker.helpers.arrayElement(fitnessDescriptions)
    default:
      return faker.commerce.productDescription()
  }
}

const generateProductImages = (): string[] => {
  const imageCount = faker.number.int({ min: 1, max: 4 })
  const images: string[] = []
  
  for (let i = 0; i < imageCount; i++) {
    images.push(`https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1700000000000 })}?w=800&h=600&fit=crop`)
  }
  
  return images
}

const generateProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.commissionSettings.deleteMany()

  // Create commission settings
  console.log('💰 Creating commission settings...')
  await prisma.commissionSettings.createMany({
    data: [
      { level: 1, percentage: 10, isActive: true },
      { level: 2, percentage: 5, isActive: true },
      { level: 3, percentage: 3, isActive: true },
      { level: 4, percentage: 2, isActive: true },
      { level: 5, percentage: 1, isActive: true }
    ]
  })

  // Create categories
  console.log('📂 Creating categories...')
  const createdCategories = []
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        description: category.description
      }
    })
    createdCategories.push(createdCategory)
  }

  // Create products
  console.log('📦 Creating products...')
  const productsToCreate = 120 // 20 products per category

  for (let i = 0; i < productsToCreate; i++) {
    const category = faker.helpers.arrayElement(createdCategories)
    const template = faker.helpers.arrayElement(productTemplates)
    const productName = `${template.namePrefix} ${faker.helpers.arrayElement(template.nameSuffix)}`
    
    const basePrice = faker.number.float({ min: 19.99, max: 299.99, multipleOf: 0.01 })
    const discount = faker.number.int({ min: 0, max: 40 })
    
    await prisma.product.create({
      data: {
        name: productName,
        description: getRandomDescription(category.name),
        price: basePrice,
        discount: discount,
        images: generateProductImages(),
        stock: faker.number.int({ min: 0, max: 500 }),
        sku: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
        slug: generateProductSlug(productName) + '-' + faker.string.alphanumeric({ length: 4, casing: 'lower' }),
        categoryId: category.id,
        isActive: faker.datatype.boolean({ probability: 0.9 }), // 90% active products
        createdAt: faker.date.between({ 
          from: new Date('2023-01-01'), 
          to: new Date() 
        })
      }
    })

    if ((i + 1) % 20 === 0) {
      console.log(`✅ Created ${i + 1} products...`)
    }
  }

  // Initialize rank system
  console.log('🏆 Initializing rank system...')
  await rankSystem.initializeDefaultRanks()

  // Get final counts
  const categoryCount = await prisma.category.count()
  const productCount = await prisma.product.count()
  const commissionCount = await prisma.commissionSettings.count()

  console.log('\n🎉 Seeding completed successfully!')
  console.log(`📂 Categories created: ${categoryCount}`)
  console.log(`📦 Products created: ${productCount}`)
  console.log(`💰 Commission levels created: ${commissionCount}`)
  
  console.log('\n📊 Products per category:')
  
  for (const category of createdCategories) {
    const count = await prisma.product.count({
      where: { categoryId: category.id }
    })
    console.log(`   ${category.name}: ${count} products`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
