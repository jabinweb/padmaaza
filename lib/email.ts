import nodemailer from 'nodemailer'
import { getSystemSettings } from '@/lib/settings'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailServiceClass {
  private transporter: nodemailer.Transporter | null = null
  private isConfigured: boolean = false

  constructor() {
    this.initializeTransporter()
  }

  private initializeTransporter() {
    try {
      // Check if SMTP credentials are configured
      const smtpUser = process.env.SMTP_USER
      const smtpPass = process.env.SMTP_PASSWORD // Changed from SMTP_PASS

      if (!smtpUser || !smtpPass) {
        console.warn('SMTP credentials not configured. Email notifications will be disabled.')
        return
      }

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      this.isConfigured = true
      console.log('Email service initialized successfully')
    } catch (error) {
      console.error('Failed to initialize email service:', error)
      this.isConfigured = false
    }
  }

  async sendEmail({ to, subject, html, text }: EmailOptions) {
    if (!this.isConfigured || !this.transporter) {
      console.log(`Email would be sent to ${to}: ${subject}`)
      console.log('Email service not configured - skipping email send')
      return { messageId: 'not-configured', skipped: true }
    }

    try {
      const settings = await getSystemSettings()
      
      const mailOptions = {
        from: process.env.SMTP_FROM || `"${settings.siteName}" <${process.env.SMTP_USER}>`, // Use SMTP_FROM if available
        to,
        subject,
        html,
        text: text || this.htmlToText(html)
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
      return result
    } catch (error) {
      console.error('Email sending failed:', error)
      // Don't throw error, just log it so the main process continues
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      return { messageId: 'failed', error: errorMessage }
    }
  }

  private htmlToText(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  }

  // Order confirmation email
  async sendOrderConfirmation(userEmail: string, userName: string, order: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981;">Order Confirmed! 🎉</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for your order! We're excited to process it for you.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> #${order.id.slice(-8)}</p>
          <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3>Items Ordered:</h3>
          ${order.orderItems.map((item: any) => `
            <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
              <p><strong>${item.product.name}</strong></p>
              <p>Quantity: ${item.quantity} | Price: ₹${item.price.toFixed(2)}</p>
            </div>
          `).join('')}
        </div>

        <p>We'll send you another email when your order ships.</p>
        <p>Thanks for shopping with us!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            If you have any questions, reply to this email or contact our support team.
          </p>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: userEmail,
      subject: `Order Confirmation - #${order.id.slice(-8)}`,
      html
    })
  }

  // Commission earned email
  async sendCommissionAlert(userEmail: string, userName: string, commission: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981;">Commission Earned! 💰</h1>
        <p>Hi ${userName},</p>
        <p>Great news! You've earned a new commission.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Commission Details:</h3>
          <p><strong>Amount:</strong> ₹${commission.amount.toFixed(2)}</p>
          <p><strong>Level:</strong> ${commission.level}</p>
          <p><strong>Type:</strong> ${commission.type}</p>
          <p><strong>From:</strong> ${commission.fromUser.name}</p>
          <p><strong>Date:</strong> ${new Date(commission.createdAt).toLocaleDateString()}</p>
        </div>

        <p>This commission has been added to your wallet.</p>
        <p>Keep up the great work building your network!</p>
        
        <div style="margin-top: 30px;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/commissions" 
             style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View All Commissions
          </a>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: userEmail,
      subject: `New Commission Earned - ₹${commission.amount.toFixed(2)}`,
      html
    })
  }

  // Rank achievement email
  async sendRankAchievement(userEmail: string, userName: string, newRank: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Congratulations! 🏆</h1>
        <p>Hi ${userName},</p>
        <p>Amazing news! You've achieved a new rank in our program.</p>
        
        <div style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0;">
          <h2 style="margin: 0; font-size: 28px;">🎉 ${newRank.name} 🎉</h2>
          <p style="margin: 10px 0 0 0; font-size: 18px;">${newRank.description}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Rank Benefits:</h3>
          <ul>
            <li>Increased commission rate: ${newRank.commissionMultiplier}x</li>
            <li>Special recognition badge</li>
            <li>Priority support</li>
            <li>Exclusive promotions and bonuses</li>
          </ul>
        </div>

        <p>This achievement reflects your dedication and success. Keep growing your network to unlock even more rewards!</p>
        
        <div style="margin-top: 30px;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard" 
             style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            View Dashboard
          </a>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: userEmail,
      subject: `🏆 Congratulations! You've achieved ${newRank.name} rank!`,
      html
    })
  }

  // Partner application admin notification
  async sendPartnerApplicationAdminNotification(data: any, newUser: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F5873B;">New Partner Application Received</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Partner Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Partnership Tier:</strong> ${data.partnershipTier}</p>
          <p><strong>Expected Customers:</strong> ${data.expectedCustomers}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Business Information</h3>
          <p><strong>Business Name:</strong> ${data.businessName || 'N/A'}</p>
          <p><strong>Business Type:</strong> ${data.businessType}</p>
          <p><strong>Experience:</strong> ${data.experience}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Address</h3>
          <p>${data.address}</p>
          <p>${data.city}, ${data.state} ${data.zipCode}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Additional Information</h3>
          <p><strong>Motivation:</strong> ${data.motivation}</p>
          <p><strong>Marketing Plan:</strong> ${data.marketingPlan}</p>
        </div>
        
        <p style="color: #28a745; font-weight: bold;">✅ User has been automatically created and approved as a MEMBER.</p>
        <p><strong>User ID:</strong> ${newUser.id}</p>
        <p><strong>Referral Code:</strong> ${newUser.referralCode}</p>
      </div>
    `

    return await this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'srajeev7053@gmail.com',
      subject: `New Partner Application - ${data.partnershipTier} Tier`,
      html
    })
  }

  // Partner welcome email
  async sendPartnerWelcomeEmail(data: any, newUser: any, randomPassword: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #F5873B; color: white; padding: 20px; text-align: center;">
          <h1>Welcome to Padmaaja Rasooi!</h1>
          <p>Your partnership application has been approved</p>
        </div>
        
        <div style="padding: 20px;">
          <h2>Congratulations, ${data.firstName}!</h2>
          <p>We're excited to welcome you as a <strong>${data.partnershipTier}</strong> partner in the Padmaaja Rasooi family.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Login Details</h3>
            <p><strong>Website:</strong> <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}">${process.env.NEXTAUTH_URL || 'http://localhost:3000'}</a></p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Password:</strong> ${randomPassword}</p>
            <p><strong>Your Referral Code:</strong> ${newUser.referralCode}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Partnership Details</h3>
            <p><strong>Tier:</strong> ${data.partnershipTier}</p>
            <p><strong>Required Members:</strong> Minimum 3 members must be added</p>
            <p><strong>Commission Structure:</strong> Earn commissions on all purchases made by your referrals</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Next Steps</h3>
            <ol>
              <li>Log in to your partner dashboard using the credentials above</li>
              <li>Complete your profile setup</li>
              <li>Add minimum 3 members using your referral code</li>
              <li>Track your earnings and commissions in real-time</li>
            </ol>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Important Notes</h3>
            <ul>
              <li>You must add at least <strong>3 members</strong> to maintain your partnership</li>
              <li>You'll earn commissions on all purchases made by your referrals</li>
              <li>Please change your password after first login for security</li>
              <li>Contact support for any questions: ${process.env.SUPPORT_EMAIL || 'srajeev7053@gmail.com'}</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin" 
               style="background-color: #F5873B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Login to Your Dashboard
            </a>
          </div>
          
          <p>Thank you for joining Padmaaja Rasooi. We look forward to a successful partnership!</p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #666;">
            <p>Best regards,<br>The Padmaaja Rasooi Team</p>
          </div>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: data.email,
      subject: 'Welcome to Padmaaja Rasooi Partnership Program!',
      html
    })
  }

  // Member added admin notification
  async sendMemberAddedAdminNotification(partner: any, newMember: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F5873B;">New Member Added</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Partner Information</h3>
          <p><strong>Partner:</strong> ${partner.name} (${partner.email})</p>
          <p><strong>Partner Tier:</strong> ${partner.partnerTier || 'N/A'}</p>
          <p><strong>Current Members:</strong> ${partner.referrals.length + 1}</p>
          <p><strong>Min Required:</strong> ${partner.minReferrals}</p>
          <p><strong>Status:</strong> ${partner.referrals.length + 1 >= partner.minReferrals ? '✅ Meeting minimum requirement' : '⚠️ Building minimum members'}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>New Member Information</h3>
          <p><strong>Name:</strong> ${newMember.name}</p>
          <p><strong>Email:</strong> ${newMember.email}</p>
          <p><strong>Phone:</strong> ${newMember.phone}</p>
          <p><strong>User ID:</strong> ${newMember.id}</p>
          <p><strong>Referral Code:</strong> ${newMember.referralCode}</p>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'srajeev7053@gmail.com',
      subject: `New Member Added by Partner: ${partner.name}`,
      html
    })
  }

  // Member welcome email
  async sendMemberWelcomeEmail(memberData: any, partner: any, randomPassword: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #F5873B; color: white; padding: 20px; text-align: center;">
          <h1>Welcome to Padmaaja Rasooi!</h1>
          <p>You've been added by our partner: ${partner.name}</p>
        </div>
        
        <div style="padding: 20px;">
          <h2>Hello ${memberData.name}!</h2>
          <p>Welcome to the Padmaaja Rasooi family! You've been added as a member by our partner <strong>${partner.name}</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Account Details</h3>
            <p><strong>Website:</strong> <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}">${process.env.NEXTAUTH_URL || 'http://localhost:3000'}</a></p>
            <p><strong>Email:</strong> ${memberData.email}</p>
            <p><strong>Password:</strong> ${randomPassword}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What's Next?</h3>
            <ol>
              <li>Log in to your account using the credentials above</li>
              <li>Browse our premium spice collection</li>
              <li>Place your first order and enjoy exclusive member benefits</li>
              <li>Earn rewards and commissions through our referral program</li>
            </ol>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Member Benefits</h3>
            <ul>
              <li>Exclusive access to premium spices and masalas</li>
              <li>Special member pricing and discounts</li>
              <li>Earn commissions by referring others</li>
              <li>Priority customer support</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin" 
               style="background-color: #F5873B; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Login to Your Account
            </a>
          </div>
          
          <p><strong>Important:</strong> Please change your password after first login for security.</p>
          <p>If you have any questions, contact us at ${process.env.SUPPORT_EMAIL || 'srajeev7053@gmail.com'}</p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #666;">
            <p>Best regards,<br>The Padmaaja Rasooi Team</p>
          </div>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: memberData.email,
      subject: 'Welcome to Padmaaja Rasooi!',
      html
    })
  }

  // Wholesaler welcome email
  async sendWholesalerWelcomeEmail(wholesalerData: {
    to: string
    name: string
    email: string
    password: string
    businessName: string
  }) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Welcome to Padmaaja Rasooi Wholesaler Network! 🏪</h1>
          
          <p>Dear ${wholesalerData.name},</p>
          
          <p>Congratulations! Your wholesaler registration has been approved. You are now part of our exclusive wholesaler network.</p>
          
          <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 25px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0;">🎉 Welcome ${wholesalerData.businessName}! 🎉</h2>
            <p style="margin: 10px 0 0 0; font-size: 16px;">You now have access to wholesale benefits</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Login Credentials</h3>
            <p><strong>Email:</strong> ${wholesalerData.email}</p>
            <p><strong>Temporary Password:</strong> ${wholesalerData.password}</p>
            <p style="color: #dc2626; font-size: 14px;"><strong>Important:</strong> Please change your password after first login.</p>
          </div>
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>🎁 Your Wholesale Benefits</h3>
            <ul>
              <li><strong>25% Discount</strong> on all bulk orders</li>
              <li>Dedicated account manager</li>
              <li>Priority customer support</li>
              <li>Flexible payment terms</li>
              <li>Quality guarantee on all products</li>
              <li>Fast order processing</li>
            </ul>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Next Steps</h3>
            <ol>
              <li>Login to your account using the credentials above</li>
              <li>Complete your profile information</li>
              <li>Browse our wholesale catalog</li>
              <li>Place your first bulk order to enjoy 25% discount</li>
              <li>Contact your account manager for assistance</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin" 
               style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Login to Your Wholesaler Account
            </a>
          </div>
          
          <p>Our team will contact you within 24 hours to assist with your first order and answer any questions.</p>
          <p>For immediate assistance, contact us at ${process.env.SUPPORT_EMAIL || 'srajeev7053@gmail.com'} or call our wholesaler hotline.</p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #666;">
            <p>Best regards,<br>The Padmaaja Rasooi Wholesale Team</p>
          </div>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: wholesalerData.to,
      subject: 'Welcome to Padmaaja Rasooi Wholesale Network!',
      html
    })
  }

  // Admin notification for new wholesaler registration
  async sendWholesalerAdminNotification(wholesalerData: {
    wholesalerName: string
    wholesalerEmail: string
    businessName: string
    businessType: string
    phone: string
    expectedVolume: string
    registrationDate: string
  }) {
    const settings = await getSystemSettings()
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #dc2626; text-align: center; margin-bottom: 30px;">🏪 New Wholesaler Registration</h1>
          
          <p>A new wholesaler has registered on the platform.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Wholesaler Details</h3>
            <p><strong>Name:</strong> ${wholesalerData.wholesalerName}</p>
            <p><strong>Email:</strong> ${wholesalerData.wholesalerEmail}</p>
            <p><strong>Business Name:</strong> ${wholesalerData.businessName}</p>
            <p><strong>Business Type:</strong> ${wholesalerData.businessType}</p>
            <p><strong>Phone:</strong> ${wholesalerData.phone}</p>
            <p><strong>Expected Volume:</strong> ${wholesalerData.expectedVolume}</p>
            <p><strong>Registration Date:</strong> ${wholesalerData.registrationDate}</p>
          </div>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Required Actions</h3>
            <ul>
              <li>Review the wholesaler's application</li>
              <li>Contact the wholesaler within 24 hours</li>
              <li>Assign an account manager</li>
              <li>Set up wholesale pricing if needed</li>
              <li>Provide product catalogs and information</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/users" 
               style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              View in Admin Panel
            </a>
          </div>
          
          <p>The wholesaler has been automatically approved and given access to 25% wholesale discounts on bulk orders.</p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center; color: #666;">
            <p>This is an automated notification from Padmaaja Rasooi</p>
          </div>
        </div>
      </div>
    `

    return await this.sendEmail({
      to: settings.supportEmail,
      subject: `New Wholesaler Registration - ${wholesalerData.businessName}`,
      html
    })
  }
}

export const emailService = new EmailServiceClass()

// Export the class properly without circular reference
export const EmailService = EmailServiceClass
export default EmailServiceClass
