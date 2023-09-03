import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import React from 'react'

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const { languages, originalPath, t } = useI18next()

  return (
    <header className="main-header">
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {t('Welcome to {{siteTitle}}', { siteTitle })}
        </Link>
      </h1>
      <ul className="languages">
        {languages.map((lng) => (
          <li key={lng}>
            <Link to={originalPath} language={lng}>
              {lng}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
