import React from 'react'

type Props = {}

const Footer = (props: Props) => {
return (
    <div className='border-t-2 border-black bg-gray-900 min-h-[100px]'>
            <div className='p-4'>
                    <p className='text-sm text-gray-500'>&copy; {new Date().getFullYear()} Whitespace. All rights reserved.</p>
            </div>
    </div>
)
}

export default Footer