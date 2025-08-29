import Razorpay from 'razorpay'

const isProduction = process.env.RAZORPAY_ENV === 'production'

export const getRazorpayConfig = () => {
  const keyId = isProduction 
    ? process.env.RAZORPAY_LIVE_KEY_ID 
    : process.env.RAZORPAY_TEST_KEY_ID

  const keySecret = isProduction 
    ? process.env.RAZORPAY_LIVE_KEY_SECRET 
    : process.env.RAZORPAY_TEST_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error(`Missing Razorpay ${isProduction ? 'live' : 'test'} credentials`)
  }

  return {
    keyId,
    keySecret,
    isProduction
  }
}

export const createRazorpayInstance = () => {
  const config = getRazorpayConfig()
  
  return new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret,
  })
}

export const getRazorpayKeyId = () => {
  const config = getRazorpayConfig()
  return config.keyId
}

export const createOrder = async (amount: number, orderId: string): Promise<any> => {
  try {
    const order = await createRazorpayInstance().orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: orderId,
      payment_capture: true,
    })
    return order
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export const verifyPayment = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) => {
  const crypto = require('crypto')
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
  hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`)
  const generatedSignature = hmac.digest('hex')
  
  return generatedSignature === razorpaySignature
}
