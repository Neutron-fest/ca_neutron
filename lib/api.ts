import { FormData } from "@/components/form-page-1"

export async function submitFormToNotion(formData: FormData): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form')
    }

    return {
      success: true,
      message: result.message || 'Form submitted successfully!',
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    return {
      success: false,
      message: 'Failed to submit form',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
