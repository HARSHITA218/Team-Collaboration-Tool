'use server'

import { getBucket, logEvent } from '@/lib/gcp'
import { revalidatePath } from 'next/cache'

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')

    // If Google Cloud isn't configured in the .env, log a warning and mock it
    const bucket = getBucket();
    if (!bucket) {
      console.warn('Google Cloud not configured. Mocking file upload.')
      await logEvent(`Mock uploaded: ${file.name}`, 'INFO')
      revalidatePath('/work')
      return { success: true }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const gcsFile = bucket.file(`uploads/${Date.now()}-${file.name}`)
    
    await gcsFile.save(buffer, {
      contentType: file.type,
      resumable: false
    })

    await logEvent(`Successfully uploaded file to GCS: ${file.name}`, 'INFO')
    revalidatePath('/work')
    
    return { success: true }
  } catch (error: any) {
    await logEvent(`Failed to upload file: ${error.message}`, 'ERROR')
    throw new Error('Failed to upload file')
  }
}
