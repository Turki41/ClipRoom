'use client'

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { MAX_FILE_SIZE, MAX_THUMBNAIL_SIZE } from '@/constants'
import { useFileInput } from '@/hooks/useFileInput'
import { useUploadVideoMutation } from '@/services/upload'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const [uploadVideo, { isLoading }] = useUploadVideoMutation()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  })

  const video = useFileInput(MAX_FILE_SIZE)
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({ ...prev, [id]: value }))

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)

      if (!formData.title || !formData.description) {
        setError('Title and description are required.')
        return
      } else if (!video.file || !thumbnail.file) {
        setError('Please upload a video and thumbnail.')
        return
      }

      setError('')

      const form = new FormData()
      form.append('title', formData.title)
      form.append('description', formData.description)
      form.append('visibility', formData.visibility)
      form.append('video', video.file)
      form.append('thumbnail', thumbnail.file)
      form.append('duration', video.duration.toString())

      await uploadVideo(form).unwrap()
      toast.success('Video uploaded successfully!')

    } catch (error) {
      return toast.error('Failed to upload video. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='wrapper-md upload-page'>
      <h1>Upload a video</h1>

      <form onSubmit={handleSubmit}>
        <FormField id='title' label='Title' value={formData.title} onChange={handleInputChange} placeholder='Enter a title' />
        <FormField id='description' label='Description' value={formData.description} onChange={handleInputChange} placeholder='Enter a description' as='textarea' />

        <FileInput id='video' label='Video' accept='video/*' file={video.file} previewUrl={video.previewUrl} inputRef={video.inputRef} onChange={video.handleFileChange} onReset={video.resetFile} type='video' />
        <FileInput id='thumbnail' label='Thumbnail' accept='image/*' file={thumbnail.file} previewUrl={thumbnail.previewUrl} inputRef={thumbnail.inputRef} onChange={thumbnail.handleFileChange} onReset={thumbnail.resetFile} type='image' />

        <FormField id='visibility' label='Visibility' value={formData.visibility} onChange={handleInputChange} as='select' options={[{ value: 'public', label: 'Public' }, { value: 'private', label: 'Private' }]} />

        {error && <div className='error-field'>{error}</div>}
        <button className='submit-button' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Uploading...' : 'Upload Video'}</button>
      </form>
    </div>
  )
}

export default page