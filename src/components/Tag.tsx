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
      aria-label={t('google_seach', { text })}
      className="gradiente__tag-container flex items-center justify-center rounded-full p-[2px]"
    >
      <div className="gradiente__tag flex items-center justify-center rounded-full bg-charcoal-black-700 px-3.5 py-1.5">
        <span className="text-sm font-semibold leading-tight text-white/40">{text}</span>
      </div>
    </a>
  )
}

export default Tag
