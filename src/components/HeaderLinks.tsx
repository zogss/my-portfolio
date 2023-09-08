import clsx from 'clsx'
import { Link } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { useEffect, useRef, useState } from 'react'

interface HeaderLinksProps {
  floating?: boolean
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ floating }) => {
  //* hooks
  const { t } = useI18next()

  //* refs
  const floatingBarRef = useRef<HTMLDivElement>(null)

  //* states
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  //* handlers
  const handleMouseEnter = (index: string) => {
    setHoveredItem(index)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  //* effects
  useEffect(() => {
    if (hoveredItem) {
      const hoveredElement = document.getElementById(hoveredItem)
      const floatingBarElement = floatingBarRef.current
      if (hoveredElement && floatingBarElement) {
        floatingBarElement.style.width = `${hoveredElement.offsetWidth}px`
        floatingBarElement.style.height = `${hoveredElement.offsetHeight}px`
        floatingBarElement.style.top = `${hoveredElement.offsetTop}px`
        floatingBarElement.style.left = `${hoveredElement.offsetLeft}px`
      }
    }
  }, [hoveredItem])

  //* render
  return (
    <div className="flex items-center" onMouseLeave={handleMouseLeave}>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.to}
          id={`${link.name}-${floating ? 'floating' : 'header'}`}
          data-to-scrollspy-id={link.to.replace('#', '')}
          className="relative z-[1] flex rounded px-5 py-2.5 text-neutral-100/50 transition-colors duration-200 hover:text-neutral-100"
          onMouseEnter={() => handleMouseEnter(`${link.name}-${floating ? 'floating' : 'header'}`)}
        >
          {t(link.name)}
          <div className="link-border absolute bottom-0 left-0 right-0" />
        </Link>
      ))}
      <div
        ref={floatingBarRef}
        className={clsx(
          'absolute rounded bg-white/20 transition-all',
          hoveredItem ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  )
}

export default HeaderLinks

const links = [
  {
    name: 'home',
    to: '#home',
  },
  {
    name: 'about',
    to: '#about',
  },
  {
    name: 'projects',
    to: '#projects',
  },
  {
    name: 'tech_stack',
    to: '#tech-stack',
  },
  {
    name: 'contact',
    to: '#contact',
  },
]
