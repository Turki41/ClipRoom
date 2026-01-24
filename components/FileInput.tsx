import Image from 'next/image'

const FileInput = ({ id, label, accept, file, previewUrl, inputRef, onChange, onReset, type }: FileInputProps) => {
  return (
    <section className='file-input'>
      <label htmlFor={id}>{label}</label>

      <input type={type} id={id} accept={accept} ref={inputRef} onChange={onChange} hidden />

      {!previewUrl ? (
        <figure onClick={() => inputRef.current?.click()}>
          <Image src={'/assets/icons/upload.svg'} alt='upload' width={24} height={24} />
          <figcaption>Click to upload your {type}</figcaption>
        </figure>
      ) : (
        <div>
          {type === 'video'
            ? (<video src={previewUrl} controls />)
            : (<Image src={previewUrl} alt='preview Image' fill />)
          }
          <button type='button' onClick={onReset}>
            <Image src={'/assets/icons/close.svg'} alt='close' width={16} height={16}/>
          </button>
          
          <p>{file?.name}</p>
        </div>
      )}
    </section>
  )
}

export default FileInput