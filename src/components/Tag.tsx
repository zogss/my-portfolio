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
    <a
      href={`https://www.google.com/search?q=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      title={t('google_seach', { text })}
      aria-label={t('google_seach', { text })}
      className="flex items-center justify-center rounded-full bg-gradient-primary p-0.5"
    >
      <div className="flex items-center justify-center rounded-full bg-charcoal-black-700 bg-gradient-secondary px-3 py-1 shadow-primary backdrop-blur-[1.25rem] md:px-3.5 md:py-1.5">
        <span className="text-xs font-semibold leading-tight text-white/40 md:text-sm">{text}</span>
      </div>
    </a>
  )
}

export default Tag
