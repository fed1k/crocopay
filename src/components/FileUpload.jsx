// components/FileUploader.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase_utils'

export default function FileUploader() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return alert('Please select a file')

    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('kredo') // replace with your bucket
      .upload(`uploads/${fileName}`, file)

    setUploading(false)

    if (error) {
      console.error(error)
      alert('Error uploading file')
    } else {
      alert('File uploaded successfully!')
      // console.log('Uploaded file:', data.fullPath)
    }
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
