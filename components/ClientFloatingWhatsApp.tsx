'use client'

import { LazyFloatingWhatsApp } from './DynamicComponents'

interface ClientFloatingWhatsAppProps {
  phoneNumber: string
  message: string
  position: "bottom-right" | "bottom-left"
  showTooltip: boolean
}

export default function ClientFloatingWhatsApp(props: ClientFloatingWhatsAppProps) {
  return <LazyFloatingWhatsApp {...props} />
}
