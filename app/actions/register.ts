'use server'

import { writeClient } from '@/sanity/lib/writeClient'
import { revalidatePath } from 'next/cache'

export async function submitRegistration(prevState: any, formData: FormData) {
  const eventId = formData.get('eventId') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string

  if (!name || !email || !eventId) {
    return { success: false, error: 'Please provide all required fields.' }
  }

  try {
    await writeClient.create({
      _type: 'registration',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      name,
      email,
      phone: phone || '',
      registeredAt: new Date().toISOString(),
    })

    revalidatePath('/events')
    return { success: true, error: null }
  } catch (err: any) {
    console.error('Registration error:', err)
    return {
      success: false,
      error: err?.message || 'Failed to submit registration. Please try again.',
    }
  }
}