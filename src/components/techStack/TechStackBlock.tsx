import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { StaticImage } from 'gatsby-plugin-image'
import { useI18next } from 'gatsby-plugin-react-i18next'
import React, { Fragment } from 'react'
import {
  BiLogoAngular,
  BiLogoJavascript,
  BiLogoMongodb,
  BiLogoRedux,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from 'react-icons/bi'
import { FaBootstrap, FaCss3, FaHtml5, FaNodeJs, FaReact, FaSass } from 'react-icons/fa'
import {
  SiAlpinedotjs,
  SiApollographql,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiGatsby,
  SiGit,
  SiGraphql,
  SiHandlebarsdotjs,
  SiMui,
  SiNextdotjs,
  SiPrisma,
  SiReactivex,
  SiStorybook,
  SiStyledcomponents,
} from 'react-icons/si'

const TechStackBlock: React.FC = () => {
  const { t } = useI18next()

  const getActiveTab = () => {
    if (typeof window !== 'undefined') {
      const activeTab = localStorage.getItem('techStackActiveTab')
      if (activeTab) {
        return parseInt(activeTab)
      }
    }
    return 1
  }

  const setActiveTab = (index: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('techStackActiveTab', index.toString())
    }
  }

  return (
    <div className="z-[1] flex w-full flex-1 justify-center">
      <Tab.Group
        as="div"
        defaultIndex={getActiveTab()}
        className="flex w-full flex-col items-center gap-2.5 overflow-hidden rounded-lg bg-midnight-slate-700 2xl:w-3/4"
      >
        <Tab.List className="flex w-full max-w-full justify-start -space-x-0.5 overflow-x-auto pb-0.5 md:justify-center">
          <Tab
            onClick={() => setActiveTab(0)}
            className={({ selected }) =>
              clsx(
                'flex-1 rounded-tl-lg border-b-2 border-r-2 border-white bg-midnight-slate-700 px-5 py-3 transition-all duration-500 md:py-4 lg:px-7',
                selected
                  ? 'z-[1] border-b-transparent border-opacity-5'
                  : 'border-r-transparent border-opacity-5 text-neutral-100/50 hover:bg-white/5'
              )
            }
          >
            {({ selected }) => (
              <div className="flex flex-1 items-center justify-center gap-3 text-sm font-semibold md:justify-start md:text-base lg:gap-6">
                <StaticImage
                  src="../../images/backend_icon.png"
                  alt={t('backend_icon_alt')}
                  width={40}
                  height={40}
                  className={clsx(
                    'h-8 w-8 shrink-0 transition-opacity duration-500 md:h-10 md:w-10',
                    {
                      'opacity-70': !selected,
                    }
                  )}
                />
                <span className={clsx(selected ? 'block' : 'sr-only md:not-sr-only')}>Backend</span>
              </div>
            )}
          </Tab>
          <Tab
            onClick={() => setActiveTab(1)}
            className={({ selected }) =>
              clsx(
                'flex-1 border-x-2 border-b-2 border-white bg-midnight-slate-700 px-5 py-3 transition-all duration-500 md:py-4 lg:px-7',
                selected
                  ? 'z-[1] border-b-transparent border-opacity-5'
                  : 'border-x-transparent border-opacity-5 text-neutral-100/50 hover:bg-white/5'
              )
            }
          >
            {({ selected }) => (
              <div className="flex flex-1 items-center justify-center gap-3 text-sm font-semibold md:justify-start md:text-base lg:gap-6">
                <StaticImage
                  src="../../images/frontend_icon.png"
                  alt={t('frontend_icon_alt')}
                  width={40}
                  height={40}
                  className={clsx(
                    'h-8 w-8 shrink-0 transition-opacity duration-500 md:h-10 md:w-10',
                    {
                      'opacity-70': !selected,
                    }
                  )}
                />
                <span className={clsx(selected ? 'block' : 'sr-only md:not-sr-only')}>
                  Frontend
                </span>
              </div>
            )}
          </Tab>
          <Tab
            onClick={() => setActiveTab(2)}
            className={({ selected }) =>
              clsx(
                'flex-1 rounded-tr-lg border-b-2 border-l-2 border-white bg-midnight-slate-700 px-5 py-3 transition-all duration-500 md:py-4 lg:px-7',
                selected
                  ? 'z-[1] border-b-transparent border-opacity-5'
                  : 'border-l-transparent border-opacity-5 text-neutral-100/50 hover:bg-white/5'
              )
            }
          >
            {({ selected }) => (
              <div className="flex flex-1 items-center justify-center gap-3 text-sm font-semibold md:justify-start md:text-base lg:gap-6">
                <StaticImage
                  src="../../images/mobile_icon.png"
                  alt={t('mobile_icon_alt')}
                  width={40}
                  height={40}
                  className={clsx(
                    'h-8 w-8 shrink-0 transition-opacity duration-500 md:h-10 md:w-10',
                    {
                      'opacity-70': !selected,
                    }
                  )}
                />
                <span className={clsx(selected ? 'block' : 'sr-only md:not-sr-only')}>Mobile</span>
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels as={Fragment}>
          {techStack.map((stack, i) => (
            <Tab.Panel key={`tech-stack-${i}`} as="div" className="flex w-full">
              <ul className="flex w-full flex-wrap items-center justify-center gap-8 self-stretch p-6">
                {stack.techs.map(({ title, Icon, color }, i) => (
                  <li key={i}>
                    <div className="relative flex flex-col items-center justify-center gap-3">
                      <Icon
                        style={{
                          color,
                        }}
                        className="z-[1] h-7 w-7 md:h-9 md:w-9 lg:h-11 lg:w-11"
                      />
                      <a
                        href={`https://www.google.com/search?q=${title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t('google_seach', { text: title })}
                        aria-label={t('google_seach', { text: title })}
                        className="z-[1] text-xs font-medium md:text-sm"
                      >
                        {title}
                      </a>
                      <div className="absolute inset-0 flex items-start justify-center pt-6">
                        <div className="h-5 w-5 bg-slate-gray-300 blur-xl" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TechStackBlock

const techStack = [
  {
    category: 'Backend',
    techs: [
      {
        title: 'Node.js',
        Icon: FaNodeJs,
        color: '#8BBF3D',
      },
      {
        title: 'Git',
        Icon: SiGit,
        color: '#F05032',
      },
      {
        title: 'Express',
        Icon: SiExpress,
        color: '#000000',
      },
      {
        title: 'MongoDB',
        Icon: BiLogoMongodb,
        color: '#47A248',
      },
      // {
      //   title: 'PostgreSQL',
      //   Icon: SiPostgresql,
      //   color: '#336791',
      // },
      // {
      //   title: 'MySQL',
      //   Icon: SiMysql,
      //   color: '#4479A1',
      // },
      {
        title: 'Prisma',
        Icon: SiPrisma,
        color: '#1B222D',
      },
      {
        title: 'Firebase',
        Icon: SiFirebase,
        color: '#FFCA28',
      },
      // {
      //   title: 'Trpc',
      //   Icon: SiTrpc,
      //   color: '#000000',
      // },
      // {
      //   title: 'Python',
      //   Icon: FaPython,
      //   color: '#3776AB',
      // },
    ],
  },
  {
    category: 'Frontend',
    techs: [
      {
        title: 'HTML',
        Icon: FaHtml5,
        color: '#E44D26',
      },
      {
        title: 'CSS',
        Icon: FaCss3,
        color: '#1572B6',
      },
      {
        title: 'JavaScript',
        Icon: BiLogoJavascript,
        color: '#F7DF1E',
      },
      {
        title: 'TypeScript',
        Icon: BiLogoTypescript,
        color: '#007ACC',
      },
      {
        title: 'Handlebars',
        Icon: SiHandlebarsdotjs,
        color: '#FF7C00',
      },
      {
        title: 'React',
        Icon: FaReact,
        color: '#61DAFB',
      },
      {
        title: 'Redux',
        Icon: BiLogoRedux,
        color: '#764ABC',
      },
      {
        title: 'Gatsby',
        Icon: SiGatsby,
        color: '#663399',
      },
      {
        title: 'Next.js',
        Icon: SiNextdotjs,
        color: '#000000',
      },
      {
        title: 'Storybook',
        Icon: SiStorybook,
        color: '#FF4785',
      },

      {
        title: 'GraphQL',
        Icon: SiGraphql,
        color: '#E10098',
      },
      {
        title: 'Apollo',
        Icon: SiApollographql,
        color: '#311C87',
      },
      // {
      //   title: 'Jest',
      //   Icon: SiJest,
      //   color: '#C21325',
      // },
      {
        title: 'Angular',
        Icon: BiLogoAngular,
        color: '#DD0031',
      },
      {
        title: 'RxJS',
        Icon: SiReactivex,
        color: '#B7178C',
      },
      {
        title: 'Alpine.js',
        Icon: SiAlpinedotjs,
        color: '#8BC0D0',
      },
      {
        title: 'Firebase',
        Icon: SiFirebase,
        color: '#FFCA28',
      },
      {
        title: 'Sass',
        Icon: FaSass,
        color: '#CC6699',
      },
      {
        title: 'Tailwind CSS',
        Icon: BiLogoTailwindCss,
        color: '#38B2AC',
      },
      {
        title: 'Bootstrap',
        Icon: FaBootstrap,
        color: '#7952B3',
      },
      {
        title: 'Material UI',
        Icon: SiMui,
        color: '#0081CB',
      },
      {
        title: 'Styled Components',
        Icon: SiStyledcomponents,
        color: '#DB7093',
      },
    ],
  },
  {
    category: 'Mobile',
    techs: [
      {
        title: 'React Native',
        Icon: FaReact,
        color: '#61DAFB',
      },
      {
        title: 'Expo',
        Icon: SiExpo,
        color: '#000000',
      },
      {
        title: 'Redux',
        Icon: BiLogoRedux,
        color: '#764ABC',
      },
    ],
  },
]
