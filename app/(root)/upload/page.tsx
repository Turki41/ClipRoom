'use client'

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { useEffect, useState } from 'react'

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  })

  const video:any = {}
  const thumbnail:any = {}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({ ...prev, [id]: value }))
   
  }

  useEffect(() => {
  console.log(formData)
}, [formData])
  return (
    <div className='wrapper-md upload-page'>
      <h1>Upload a video</h1>

      {error && <div className='error-field'>{error}</div>}
      <form>
        <FormField id='title' label='Title' value={formData.title} onChange={handleInputChange} placeholder='Enter a title'/>
        <FormField id='description' label='Description' value={formData.description} onChange={handleInputChange} placeholder='Enter a description' as='textarea'/>

        <FileInput id='video' label='Video' accept='video/*' file={video.file} previewUrl={video.previewUrl} inputRef={video.inputRef} onChange={video.handleFileChange} onReset={video.resetFile} type='video'/>
        <FileInput id='thumbnail' label='Thumbnail' accept='image/*' file={thumbnail.file} previewUrl={thumbnail.previewUrl} inputRef={thumbnail.inputRef} onChange={thumbnail.handleFileChange} onReset={thumbnail.resetFile} type='image'/>

        <FormField id='visibility' label='Visibility' value={formData.visibility} onChange={handleInputChange} as='select' options={[{value: 'public', label: 'Public'}, {value: 'private', label: 'Private'}]}/>

        <button className='submit-button' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Uploading...' : 'Upload Video'}</button>
      </form>
    </div>
  )
}

export default page