import { WindowLocation } from '@reach/router'
import { Link } from 'gatsby'
import { GatsbyImage, getImage, type ImageDataLike } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { startCase } from 'lodash'
import React, { Fragment } from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
  image?: {
    src: ImageDataLike
    alt: string
  }
  location: WindowLocation
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, image, location }) => {
  //* hooks
  const { t } = useI18next()

  //* constants
  const paths = `/home${location.pathname.replace('/en', '')}`.split('/').filter((path) => path)

  //* render
  return (
    <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden md:h-[40vh] lg:h-[50vh]">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 bg-black/40">
        <div className="flex flex-col items-center justify-start gap-2.5">
          <h1 className="text-4xl font-black leading-[100.5%] tracking-[.08rem] backdrop-blur-[.1766rem] text-shadow-primary sm:text-5xl md:text-[4rem]">
            {t(title)}
          </h1>
          <h2 className="text-center text-sm font-medium text-neutral-400 md:text-base lg:text-lg">
            {t(subtitle)}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-2.5 self-stretch text-center text-sm font-medium text-neutral-300 md:text-base lg:text-lg">
          {paths.map((path, i) => (
            <Fragment key={`path-${i}`}>
              {i < paths.length - 1 ? (
                <Link
                  to={`/${path === 'home' ? '' : path}`}
                  className="transition-all hover:text-neutral-400 hover:underline"
                >
                  {t(path)}
                </Link>
              ) : (
                <span>{t(startCase(path))}</span>
              )}
              {i !== paths.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </div>
      </div>
      {image && (
        <div className="absolute inset-0 z-[-1]">
          <GatsbyImage
            image={getImage(image.src)!}
            alt={image.alt}
            className="h-full w-full object-cover object-center blur-sm"
          />
        </div>
      )}
    </div>
  )
}

export default PageHeader
