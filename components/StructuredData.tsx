'use client'

interface StructuredDataProps {
  data: any
  id?: string
}

export default function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id || 'structured-data'}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  )
}

// Utility component for multiple structured data objects
interface MultipleStructuredDataProps {
  dataArray: any[]
  idPrefix?: string
}

export function MultipleStructuredData({ dataArray, idPrefix = 'structured-data' }: MultipleStructuredDataProps) {
  return (
    <>
      {dataArray.map((data, index) => (
        <StructuredData
          key={`${idPrefix}-${index}`}
          id={`${idPrefix}-${index}`}
          data={data}
        />
      ))}
    </>
  )
}
