'use client'

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { useState } from 'react'

const page = () => {
  const [error, setError] = useState<null | string>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <div className='wrapper-md upload-page'>
      <h1>Upload a video</h1>

      {error && <div className='error-field'>{error}</div>}
      <form>
        <FormField id='title' label='Title' value={formData.title} onChange={handleInputChange} placeholder='Enter a title'/>
        <FormField id='description' label='Description' value={formData.description} onChange={handleInputChange} placeholder='Enter a description' as='textarea'/>

        <FileInput />

      </form>
    </div>
  )
}

export default page