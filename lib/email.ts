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
}

export const emailService = new EmailServiceClass()

// Export the class properly without circular reference
export const EmailService = EmailServiceClass
export default EmailServiceClass
