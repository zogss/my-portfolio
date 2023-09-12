import React from 'react'

interface TagProps {
  text: string
}

const Tag: React.FC<TagProps> = ({ text }) => (
  <div className="flex items-center justify-center rounded-full bg-gradient-primary p-0.5">
    <div className="flex items-center justify-center rounded-full bg-charcoal-black-700 bg-gradient-secondary px-3 py-1 shadow-primary backdrop-blur-[1.25rem] md:px-3.5 md:py-1.5">
      <span className="text-xs font-semibold leading-tight text-white/40 md:text-sm">{text}</span>
    </div>
  </div>
)

export default Tag
