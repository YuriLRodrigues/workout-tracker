import { Buffer } from 'buffer'

type ExtraProp = {
  key: string
  value: string
}

type CreateFileProps = {
  file: File
  extraProps?: ExtraProp[]
}

export const createFileFormData = async ({ extraProps = [], file }: CreateFileProps): Promise<FormData> => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const filePayload = {
    originalname: file.name,
    size: file.size,
    mimetype: file.type,
    body: buffer.toString('base64'),
  }
  const formData = new FormData()
  formData.append('file', new Blob([JSON.stringify(filePayload)], { type: 'application/json' }))

  extraProps.forEach(({ key, value }) => {
    formData.append(key, value)
  })

  return formData
}
