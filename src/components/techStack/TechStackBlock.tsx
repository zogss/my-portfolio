import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
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
import { enterLeftAnimation } from '~/utils'

const TechStackBlock: React.FC = () => {
  //* hooks
  const { t } = useI18next()

  //* handlers
  const getActiveTab = () => {
    const activeTab = localStorage.getItem('techStackActiveTab')
    if (activeTab) {
      return parseInt(activeTab)
    }
    return 1
  }

  const setActiveTab = (index: number) => {
    localStorage.setItem('techStackActiveTab', index.toString())
  }

  //* render
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex w-full items-center justify-center"
    >
      <motion.div variants={enterLeftAnimation} className="flex w-full items-center justify-center">
        <Tab.Group
          as="div"
          defaultIndex={getActiveTab()}
          className="flex w-full flex-col items-center gap-2.5 rounded-lg bg-midnight-slate-700 2xl:w-3/4"
        >
          <Tab.List className="flex w-full items-stretch justify-center gap-3 self-stretch border-b-4 border-white/10">
            <Tab
              onClick={() => setActiveTab(0)}
              className={({ selected }) =>
                clsx(
                  'flex flex-1 items-center justify-start gap-6 rounded-t-lg px-7 py-4 text-base font-semibold ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-500 backdrop-blur-[3.5px] transition-all duration-500 focus:outline-none focus:ring-2',
                  selected ? 'bg-slate-gray-300 text-zinc-600' : 'hover:bg-white/10'
                )
              }
            >
              <StaticImage
                src="../../images/backend_icon.png"
                alt=""
                className="h-10 w-10 shrink-0"
              />
              Backend
            </Tab>
            <Tab
              onClick={() => setActiveTab(1)}
              className={({ selected }) =>
                clsx(
                  'flex flex-1 items-center justify-start gap-6 rounded-t-lg px-7 py-4 text-base font-semibold ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-500 backdrop-blur-[3.5px] transition-all duration-500 focus:outline-none focus:ring-2',
                  selected ? 'bg-slate-gray-300 text-zinc-600' : 'hover:bg-white/10'
                )
              }
            >
              <StaticImage
                src="../../images/frontend_icon.png"
                alt=""
                className="h-10 w-10 shrink-0"
              />
              Frontend
            </Tab>
            <Tab
              onClick={() => setActiveTab(2)}
              className={({ selected }) =>
                clsx(
                  'flex flex-1 items-center justify-start gap-6 rounded-t-lg px-7 py-4 text-base font-semibold ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-500 backdrop-blur-[3.5px] transition-all duration-500 focus:outline-none focus:ring-2',
                  selected ? 'bg-slate-gray-300 text-zinc-600' : 'hover:bg-white/10'
                )
              }
            >
              <StaticImage
                src="../../images/mobile_icon.png"
                alt=""
                className="h-10 w-10 shrink-0"
              />
              Mobile
            </Tab>
          </Tab.List>
          <Tab.Panels as={Fragment}>
            {techStack.map((stack, i) => (
              <Tab.Panel
                key={`tech-stack-${i}`}
                as="ul"
                className="flex flex-wrap items-center justify-center gap-8 self-stretch p-6"
              >
                {stack.techs.map(({ title, Icon, color }, i) => (
                  <li key={i} className="relative flex flex-col items-center justify-center gap-3">
                    <Icon
                      style={{
                        color,
                      }}
                      className="z-[1] h-11 w-11"
                    />
                    <a
                      href={`https://www.google.com/search?q=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('google_seach', { text: title })}
                      className="z-[1] text-sm font-medium leading-5"
                    >
                      {title}
                    </a>
                    <div className="absolute inset-0 flex items-start justify-center pt-6">
                      <div className="h-5 w-5 bg-slate-gray-300 blur-xl" />
                    </div>
                  </li>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </motion.div>
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
    ],
  },
]
