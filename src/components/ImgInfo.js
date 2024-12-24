import React from 'react'

export default function ImgInfo() {
    return (
        <div style={{ top: '0' }} className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:text-start max-lg:text-center absolute z-10 w-full h-full' >
            <div className='text lg:w-1/2 max-lg:w-full max-lg:right-0 max-lg:bottom-0 max-lg:mb-6 max-sm:mb-0  absolute   text-white z-10 '>
                <div >
                    <p className='mb-3 text-start pr-12'>
                        مدة الكورس: {'ساعه'}
                    </p>
                    <p className='mb-3 text-start pr-12'>
                        تقيم المتعلمين: {'8.2'}

                    </p>
                </div>

                <div>
                    <h2 className='text-start pr-12 max-md:text-4xl font-extrabold md:text-7xl mb-6'>{'الغه الانجليزية'}</h2>
                    <p className='mb-12  sm-x  '>{
                        'الغهالغهالغهالغهالغهيبلبببببببببببب بببببب ببببيسشييييييييييييي ييييييييييييي يالغهالغه'
                    }</p>
                </div>




                <div>
                    <button className=' w-32 h-10 rounded-3xl bg-red-600 ml-6'> مشاهدة الان</button>
                    <button className=' w-32 h-10 rounded-3xl bg-black'>اضافه للقائمة</button>

                </div>
            </div>

        </div>
    )
}
