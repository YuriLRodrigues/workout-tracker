'use client'

import Image from 'next/image'
import type React from 'react'
import { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

import { Icon } from '@/components/ui/icon'

import type { ImageType } from '@/@types/image'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { uploadSingleFileActions } from './upload-single-file.actions'

interface AvatarUploadProps {
  initialAvatarUrl?: string | null
  onAvatarChange?: (url: string) => void
  size?: number
  type?: ImageType
  blurHash?: string | null
  tagToRevalidate?: string
}

export function UploadUserAvatar({
  initialAvatarUrl,
  onAvatarChange,
  size = 80,
  type = 'avatar' as ImageType,
  blurHash,
  tagToRevalidate,
}: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialAvatarUrl ?? undefined)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return

      try {
        setIsUploading(true)

        const { success, error, data } = await uploadSingleFileActions({
          file,
          type,
          tagToRevalidate,
        })

        if (success && data) {
          setAvatarUrl(data as string)
          if (onAvatarChange) {
            onAvatarChange(data as string)
          }
          toast.success('Avatar atualizado com sucesso')
        } else {
          switch (error?.message) {
            case 'Invalid image type':
              toast.error('Tipo de arquivo inválido')
              break
            default:
              toast.error('Erro ao enviar o arquivo')
              break
          }
        }
      } catch (error) {
        toast.error('Erro ao processar o arquivo')
        console.error(error)
      } finally {
        setIsUploading(false)
      }
    },
    [type, onAvatarChange],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0])
      }
    },
    [handleUpload],
  )

  // Handle camera icon click
  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true, // Disable click on the main area
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        {/* Hidden file input */}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleUpload(e.target.files[0])
            }
          }}
          accept="image/*"
        />

        {/* Dropzone area */}
        <div {...getRootProps({ className: 'h-full w-full' })}>
          <input {...getInputProps()} />
          <div
            className={`bg-primary/10 relative flex items-center justify-center overflow-hidden rounded-full ${
              isDragActive ? 'ring-primary ring-offset-background ring-2 ring-offset-2' : ''
            } ${isUploading ? 'opacity-70' : ''}`}
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl || '/assets/default-user-avatar.webp'}
                alt="Avatar"
                fill
                sizes={`${size}px`}
                className={cn('size-full object-cover', isUploading && 'blur-md')}
                blurDataURL={avatarUrl && blurHash ? blurHash : undefined}
                loading="lazy"
                // width={96}
                // height={96}
              />
            ) : (
              <div className="text-neutral-800 dark:text-neutral-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCameraClick}
          className="bg-primary/10 hover:bg-primary/10 border-primary hover:border-primary/20 absolute -right-2 -bottom-2 z-10 cursor-pointer rounded-full border-2 border-dotted p-1.5 shadow-md transition-colors"
          aria-label="Upload avatar"
        >
          <Icon name="Camera" className="size-5" />
        </button>

        {isUploading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/30">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      {isDragActive && <div className="text-primary mt-2 text-center text-xs">Solte a imagem aqui</div>}
    </div>
  )
}
