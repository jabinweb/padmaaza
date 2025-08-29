import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedPadmaajaRasooi() {
  console.log('🌾 Seeding Padmaaja Rasooi database...')

  // Create Categories for Food Products
  const flourCategory = await prisma.category.upsert({
    where: { name: 'Flour & Grains' },
    update: {},
    create: {
      name: 'Flour & Grains',
      description: 'Premium quality flours and grain products for healthy cooking',
      image: '/images/categories/flour.jpg',
      isActive: true
    }
  })

  const riceCategory = await prisma.category.upsert({
    where: { name: 'Rice & Cereals' },
    update: {},
    create: {
      name: 'Rice & Cereals',
      description: 'Authentic basmati and non-basmati rice varieties',
      image: '/images/categories/rice.jpg',
      isActive: true
    }
  })

  const spicesCategory = await prisma.category.upsert({
    where: { name: 'Spices & Seasonings' },
    update: {},
    create: {
      name: 'Spices & Seasonings',
      description: 'Traditional spice blends and pure spices',
      image: '/images/categories/spices.jpg',
      isActive: true
    }
  })

  const pulsesCategory = await prisma.category.upsert({
    where: { name: 'Pulses & Legumes' },
    update: {},
    create: {
      name: 'Pulses & Legumes',
      description: 'Organic dals and pulses rich in protein',
      image: '/images/categories/pulses.jpg',
      isActive: true
    }
  })

  console.log('📂 Categories created successfully')

  // Create Food Products
  
  // Flour Products
  await prisma.product.upsert({
    where: { sku: 'PD-FLOUR-001' },
    update: {},
    create: {
      name: 'SHREE AAHAR Multigrain Flour',
      description: 'Premium multigrain flour made from wheat, jowar, bajra, ragi, and other nutritious grains. Perfect for making healthy rotis, parathas, and other Indian breads. Rich in fiber, protein, and essential nutrients for wholesome family nutrition.',
      price: 150.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 500,
      sku: 'PD-FLOUR-001',
      slug: 'shree-aahar-multigrain-flour',
      isActive: true,
      categoryId: flourCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-FLOUR-002' },
    update: {},
    create: {
      name: 'Premium Whole Wheat Flour',
      description: 'Pure whole wheat flour ground from carefully selected wheat grains. Stone-ground to preserve natural nutrients and fiber. Ideal for daily cooking and baking needs.',
      price: 80.00,
      discount: 5,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0d6483cae4d?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 750,
      sku: 'PD-FLOUR-002',
      slug: 'premium-whole-wheat-flour',
      isActive: true,
      categoryId: flourCategory.id
    }
  })

  // Rice Products - Based on Rate List Rice 1121
  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-001' },
    update: {},
    create: {
      name: 'Premium Basmati Rice 1121 - Extra Long Grain',
      description: 'Finest quality aged basmati rice 1121 variety with extra-long grains and distinctive aroma. Naturally aged for 12+ months for superior taste and texture. Perfect for biryanis, pulavs, and special occasions.',
      price: 250.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 300,
      sku: 'PD-RICE-1121-001',
      slug: 'premium-basmati-rice-1121-extra-long',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-002' },
    update: {},
    create: {
      name: 'Basmati Rice 1121 - Steam Processed',
      description: 'Steam processed basmati rice 1121 with enhanced shelf life and consistent quality. Perfect for daily cooking and commercial use. Maintains the authentic basmati aroma and taste.',
      price: 220.00,
      discount: 5,
      images: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 500,
      sku: 'PD-RICE-1121-002',
      slug: 'basmati-rice-1121-steam-processed',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-003' },
    update: {},
    create: {
      name: 'Basmati Rice 1121 - Sella (Parboiled)',
      description: 'Parboiled basmati rice 1121 with golden color and enhanced nutritional value. Partially boiled in the husk to retain nutrients. Excellent for biryanis and festive cooking.',
      price: 240.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 400,
      sku: 'PD-RICE-1121-003',
      slug: 'basmati-rice-1121-sella-parboiled',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-004' },
    update: {},
    create: {
      name: 'Basmati Rice 1121 - White Sella',
      description: 'White sella basmati rice 1121 with creamy white appearance and excellent cooking properties. Ideal for premium restaurants and households seeking restaurant-quality rice.',
      price: 260.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 350,
      sku: 'PD-RICE-1121-004',
      slug: 'basmati-rice-1121-white-sella',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-005' },
    update: {},
    create: {
      name: 'Basmati Rice 1121 - Golden Sella',
      description: 'Golden sella basmati rice 1121 with rich golden color and enhanced taste. Steam processing retains natural nutrients while ensuring longer shelf life.',
      price: 270.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 300,
      sku: 'PD-RICE-1121-005',
      slug: 'basmati-rice-1121-golden-sella',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-1121-006' },
    update: {},
    create: {
      name: 'Basmati Rice 1121 - Broken (25% Broken)',
      description: 'Premium quality broken basmati rice 1121 (25% broken) ideal for daily consumption at economical rates. Maintains the basmati flavor at affordable pricing.',
      price: 180.00,
      discount: 10,
      images: [
        'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 600,
      sku: 'PD-RICE-1121-006',
      slug: 'basmati-rice-1121-broken-25-percent',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-NON-BASMATI-001' },
    update: {},
    create: {
      name: 'Non-Basmati Rice - IR64 Variety',
      description: 'High-quality IR64 non-basmati rice variety suitable for daily consumption. Good texture, taste, and cooking properties. Ideal for households and commercial use.',
      price: 85.00,
      discount: 10,
      images: [
        'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 800,
      sku: 'PD-RICE-NON-BASMATI-001',
      slug: 'non-basmati-rice-ir64-variety',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-RICE-NON-BASMATI-002' },
    update: {},
    create: {
      name: 'Non-Basmati Rice - Swarna Variety',
      description: 'Premium Swarna variety non-basmati rice with excellent cooking properties and nutritional value. Popular choice for daily meals across Indian households.',
      price: 90.00,
      discount: 5,
      images: [
        'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 700,
      sku: 'PD-RICE-NON-BASMATI-002',
      slug: 'non-basmati-rice-swarna-variety',
      isActive: true,
      categoryId: riceCategory.id
    }
  })

  // Spice Products
  await prisma.product.upsert({
    where: { sku: 'PD-SPICE-001' },
    update: {},
    create: {
      name: 'Traditional Garam Masala',
      description: 'Authentic garam masala blend prepared using traditional family recipes. Made from carefully selected and ground spices including cardamom, cinnamon, cloves, and black pepper for perfect aroma and taste.',
      price: 120.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 200,
      sku: 'PD-SPICE-001',
      slug: 'traditional-garam-masala',
      isActive: true,
      categoryId: spicesCategory.id
    }
  })

  await prisma.product.upsert({
    where: { sku: 'PD-SPICE-002' },
    update: {},
    create: {
      name: 'Pure Turmeric Powder',
      description: 'Premium quality turmeric powder made from fresh turmeric roots. Rich in curcumin and natural antioxidants. Essential for Indian cooking and known for its health benefits.',
      price: 90.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 350,
      sku: 'PD-SPICE-002',
      slug: 'pure-turmeric-powder',
      isActive: true,
      categoryId: spicesCategory.id
    }
  })

  // Pulses Products
  await prisma.product.upsert({
    where: { sku: 'PD-PULSE-001' },
    update: {},
    create: {
      name: 'Organic Toor Dal',
      description: 'Premium quality organic toor dal (pigeon peas) sourced directly from certified organic farms. Rich in protein and dietary fiber. Chemical-free and naturally grown without pesticides.',
      price: 140.00,
      discount: 0,
      images: [
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=400&fit=crop&crop=center'
      ],
      stock: 250,
      sku: 'PD-PULSE-001',
      slug: 'organic-toor-dal',
      isActive: true,
      categoryId: pulsesCategory.id
    }
  })

  console.log('🍚 Food products created successfully')

  // Update System Settings for Padmaaja Rasooi
  await prisma.systemSettings.upsert({
    where: { id: 'padmaaja-system' },
    update: {},
    create: {
      id: 'padmaaja-system',
      siteName: 'Padmaaja Rasooi',
      siteDescription: 'Authentic Indian Food Products - Preserving Traditional Flavors with Modern Quality Standards',
      supportEmail: 'srajeev7053@gmail.com',
      minimumPayout: 1000,
      enableReferrals: true,
      enableCommissions: true,
      maintenanceMode: false,
      allowRegistration: true
    }
  })

  // Create Marketing Partnership Commission Settings
  const commissionLevels = [
    { level: 1, percentage: 8.0 },  // Direct referral
    { level: 2, percentage: 4.0 },  // Second level
    { level: 3, percentage: 2.0 },  // Third level
    { level: 4, percentage: 1.0 },  // Fourth level
    { level: 5, percentage: 0.5 }   // Fifth level
  ]

  for (const commission of commissionLevels) {
    await prisma.commissionSettings.upsert({
      where: { level: commission.level },
      update: {},
      create: {
        level: commission.level,
        percentage: commission.percentage,
        isActive: true
      }
    })
  }

  // Create Marketing Partnership Ranks
  const partnershipRanks = [
    {
      name: 'Silver Partner',
      description: 'Entry level marketing partnership with basic benefits',
      minReferrals: 0,
      minSalesVolume: 5000,
      minTeamVolume: 15000,
      commissionMultiplier: 1.0,
      benefits: ['Standard commission rates', 'Basic marketing materials', 'Email support'],
      color: '#C0C0C0',
      icon: '🥈',
      order: 1
    },
    {
      name: 'Gold Partner',
      description: 'Intermediate partnership level with enhanced benefits',
      minReferrals: 5,
      minSalesVolume: 15000,
      minTeamVolume: 50000,
      commissionMultiplier: 1.2,
      benefits: ['Enhanced commissions', 'Premium marketing materials', 'Priority support', 'Training access'],
      color: '#FFD700',
      icon: '🥇',
      order: 2
    },
    {
      name: 'Diamond Partner',
      description: 'Premium partnership level with maximum benefits',
      minReferrals: 15,
      minSalesVolume: 50000,
      minTeamVolume: 150000,
      commissionMultiplier: 1.5,
      benefits: ['Maximum commissions', 'Exclusive products', 'Dedicated support', 'Leadership bonuses', 'Custom branding'],
      color: '#B9F2FF',
      icon: '💎',
      order: 3
    }
  ]

  for (const rank of partnershipRanks) {
    await prisma.rank.upsert({
      where: { name: rank.name },
      update: {},
      create: rank
    })
  }

  console.log('🏆 Marketing partnership ranks created successfully')
  console.log('✅ Padmaaja Rasooi database seeded successfully!')
}

// Run the seed function
seedPadmaajaRasooi()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
