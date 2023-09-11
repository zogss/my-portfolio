import { useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'

interface TagProps {
  text: string
}

const Tag: React.FC<TagProps> = ({ text }) => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <div
      // href={`https://www.google.com/search?q=${text}`}
      // target="_blank"
      // rel="noopener noreferrer"
      // aria-label={t('google_seach', { text })}
      className="flex items-center justify-center rounded-full bg-gradient-primary p-[.125rem]"
    >
      <div className="flex items-center justify-center rounded-full bg-charcoal-black-700 bg-gradient-secondary px-3.5 py-1.5 shadow-primary backdrop-blur-[1.25rem]">
        <span className="text-sm font-semibold leading-tight text-white/40">{text}</span>
      </div>
    </div>
  )
}

export default Tag
