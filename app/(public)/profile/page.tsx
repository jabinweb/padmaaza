import { redirect } from 'next/navigation'

export default function ProfilePage() {
  // Redirect to dashboard profile page
  redirect('/dashboard/profile')
}
