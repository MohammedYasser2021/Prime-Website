import React from 'react'
import Image, { ImageProps } from 'next/image'

type ImageWithStateProps = ImageProps

function OptImage (props: ImageWithStateProps) {

  return <Image {...props}  
  alt={props.alt}
    loading='lazy'
  />
}

export default OptImage