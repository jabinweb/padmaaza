// Business Configuration
// Set to control B2B vs B2C functionality

export const businessConfig = {
  // Set to 'b2b' to disable consumer features, 'b2c' to enable them
  mode: 'b2b' as 'b2b' | 'b2c',
  
  // Feature flags
  features: {
    cart: false, // Disable cart functionality for B2B
    individualPurchase: false, // Disable individual product purchases
    checkout: false, // Disable checkout process
    consumerPricing: false, // Disable consumer-focused pricing
    wholesaleInquiry: true, // Enable wholesale inquiry forms
    bulkOrders: true, // Enable bulk order functionality
    businessAccounts: true, // Enable business account features
  },
  
  // Messaging configuration
  messaging: {
    targetAudience: 'businesses', // 'consumers' or 'businesses'
    showRetailPricing: false,
    showWholesalePricing: true,
    showMinimumOrderQuantity: true,
  }
}

// Helper functions
export const isB2BMode = () => businessConfig.mode === 'b2b'
export const isB2CMode = () => businessConfig.mode === 'b2c'
export const isFeatureEnabled = (feature: keyof typeof businessConfig.features) => 
  businessConfig.features[feature]