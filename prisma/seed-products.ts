import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedProducts() {
  console.log('🌾 Seeding Kashmina products...')

  try {
    // First, delete all existing products
    console.log('🗑️ Deleting existing products...')
    await prisma.orderItem.deleteMany({})
    await prisma.product.deleteMany({})
    
    // Ensure rice category exists
    const riceCategory = await prisma.category.upsert({
      where: { name: 'Rice & Cereals' },
      update: {},
      create: {
        name: 'Rice & Cereals',
        description: 'Premium Basmati and specialty rice varieties sourced directly from Haryanai farmers',
        image: '/images/categories/rice.jpg',
        isActive: true
      }
    })

    console.log('📦 Creating rice products with weight variations...')

    // Product data based on the attached price sheet with proper per-kg calculations
    const riceProducts = [
      // KASHMINA STEAM
      {
        baseName: 'Kashmina Steam Grade-1',
        description: 'Superior Grade-1 Kashmina Steam rice with perfect steam processing for enhanced aroma and taste.',
        marketRatePerKg: 116, // Updated rate
        companyRatePerKg: 116, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Steam Dubar',
        description: 'High-quality Dubar grade Kashmina Steam rice perfect for everyday cooking needs.',
        marketRatePerKg: 68, // Updated rate
        companyRatePerKg: 68, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Steam Tibar',
        description: 'Premium Tibar grade Kashmina Steam rice with excellent texture and cooking properties.',
        marketRatePerKg: 78, // Updated rate
        companyRatePerKg: 78, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },

      // KASHMINA SELLA
      {
        baseName: 'Kashmina Sella Grade-1',
        description: 'Premium Grade-1 Kashmina Sella rice with perfect texture and aroma. Ideal for biryani and special occasions.',
        marketRatePerKg: 104, // Updated rate
        companyRatePerKg: 104, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Sella Tibar',
        description: 'High-quality Tibar grade Kashmina Sella rice with excellent cooking properties and authentic taste.',
        marketRatePerKg: 72, // Updated rate
        companyRatePerKg: 72, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Sella Dubar',
        description: 'Premium Dubar grade Kashmina Sella rice perfect for everyday cooking and special meals.',
        marketRatePerKg: 65, // Updated rate
        companyRatePerKg: 65, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },

      // KASHMINA GOLDEN
      {
        baseName: 'Kashmina Golden Grade-1',
        description: 'Exquisite Grade-1 Kashmina Golden rice with rich golden color and superior quality. Perfect for special occasions.',
        marketRatePerKg: 109, // Updated rate
        companyRatePerKg: 109, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Golden Tibar',
        description: 'Premium Tibar grade Kashmina Golden rice with authentic golden hue and exceptional flavor.',
        marketRatePerKg: 74, // Updated rate
        companyRatePerKg: 74, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      },
      {
        baseName: 'Kashmina Golden Dubar',
        description: 'High-quality Dubar grade Kashmina Golden rice ideal for daily cooking and family meals.',
        marketRatePerKg: 66, // Updated rate
        companyRatePerKg: 66, // Company rate same as market rate
        origin: 'Haryana, India',
        brand: 'Kashmina'
      }
    ]

    // Images for different weight variations
    const image5kg = 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/Kashmina%20Rice%205KG.png-1757220648279'
    const image30kg = 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/Kashmina%20Rice%2030KG.png-1757220559950'

    // Create products with only 5kg and 30kg variations
    for (const product of riceProducts) {
      // Calculate prices for different weights
      const price5kg = product.companyRatePerKg * 5
      const price30kg = product.companyRatePerKg * 30

      // Create 5kg variant
      const product5kg = await prisma.product.create({
        data: {
          name: `${product.baseName} - 5kg`,
          description: `${product.description} Available in convenient 5kg packaging for household use.`,
          price: price5kg,
          discount: 0, // No discount
          images: [image5kg],
          stock: 100,
          manageStock: false,
          sku: `${product.baseName.toLowerCase().replace(/[^a-z0-9]/g, '')}-5kg`,
          slug: `${product.baseName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-5kg`,
          isActive: true,
          categoryId: riceCategory.id,
          brand: product.brand,
          origin: product.origin,
          weight: '5kg'
        }
      })

      // Create 30kg variant
      const product30kg = await prisma.product.create({
        data: {
          name: `${product.baseName} - 30kg`,
          description: `${product.description} Available in bulk 30kg packaging for restaurants, hotels, and wholesale buyers.`,
          price: price30kg,
          discount: 0, // No discount
          images: [image30kg],
          stock: 50,
          manageStock: false,
          sku: `${product.baseName.toLowerCase().replace(/[^a-z0-9]/g, '')}-30kg`,
          slug: `${product.baseName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-30kg`,
          isActive: true,
          categoryId: riceCategory.id,
          brand: product.brand,
          origin: product.origin,
          weight: '30kg'
        }
      })

      console.log(`✅ Created: ${product5kg.name} (₹${product5kg.price}) - Per kg: ₹${product.companyRatePerKg}`)
      console.log(`✅ Created: ${product30kg.name} (₹${product30kg.price}) - Per kg: ₹${product.companyRatePerKg}`)
    }

    const productCount = await prisma.product.count()
    console.log(`🎉 Successfully created ${productCount} products!`)

    // Display summary
    console.log('\n📊 Product Summary:')
    console.log('==================')
    
    const productsByWeight = await prisma.product.groupBy({
      by: ['weight'],
      _count: {
        id: true
      }
    })

    for (const group of productsByWeight) {
      console.log(`${group.weight}: ${group._count.id} products`)
    }

    console.log('\n✨ Products seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding products:', error)
    throw error
  }
}

async function main() {
  await seedProducts()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export default seedProducts
