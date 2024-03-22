import Lessoncard from '@/components/ui/Lessoncard'
import React from 'react'

type Props = { params: { slug: string } }

const page = ({ params }: Props) => {
  return (
    <div className='flex justify-center h-[100vh] p-5 pt-7'>
      <Lessoncard />
    </div>
  )
}

export default page