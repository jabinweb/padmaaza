import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: 'ADMIN' | 'MEMBER' | 'WHOLESALER' | 'PART_TIME' | 'CUSTOMER'
      referralCode: string
    }
  }

  interface User {
    role: 'ADMIN' | 'MEMBER' | 'WHOLESALER' | 'PART_TIME' | 'CUSTOMER'
    referralCode: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'ADMIN' | 'MEMBER' | 'WHOLESALER' | 'PART_TIME' | 'CUSTOMER'
    referralCode: string
  }
}