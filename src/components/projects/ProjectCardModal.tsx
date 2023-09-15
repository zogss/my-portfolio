import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useI18next } from 'gatsby-plugin-react-i18next'
import { kebabCase } from 'lodash'
import React, { Fragment } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import Tag from '../Tag'
import { ProjectCardProps } from './ProjectCard'

interface ProjectCardModalProps extends Omit<ProjectCardProps, 'children'> {
  isOpen: boolean
  close: () => void
  Image: React.ReactNode
  projectBackground: string
}

const ProjectCardModal: React.FC<ProjectCardModalProps> = ({
  isOpen,
  close,
  title,
  description,
  url,
  repository_url,
  techs,
  Image,
  projectBackground,
}) => {
  //* hooks
  const { t } = useI18next()

  //* render
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-charcoal-black-700 text-left align-middle text-neutral-100 shadow-white-sm transition-all sm:h-[90vh] sm:w-[80vw] md:w-[70vw] lg:w-[50vw]">
              <Dialog.Title as="div" className="flex w-full items-center justify-between px-5 py-4">
                <h3 className="text-lg font-semibold leading-6">{title}</h3>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md p-1.5 text-neutral-200 transition-colors hover:bg-white/30 hover:text-white focus:outline-none"
                >
                  <MdClose className="h-5 w-5 shrink-0" />
                </button>
              </Dialog.Title>
              <div className="h-[.0625rem] w-full bg-neutral-100/20" />
              <div className="flex h-full w-full flex-col items-center justify-start gap-4 overflow-y-auto px-5 py-4">
                <div className="flex w-fit flex-col items-start gap-3">
                  <div className="flex items-start justify-center gap-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={`${title}-circle-${i}`}
                        className={clsx('h-2 w-2 rounded-full', projectBackground)}
                      />
                    ))}
                  </div>
                  <div className="max-h-[12.5rem] overflow-hidden rounded sm:h-[12.5rem] 2xl:h-[13.75rem]">
                    {Image}
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <div className="flex w-full items-end justify-start gap-2">
                    <span className="font-medium">{t('description')}</span>
                    <div className={clsx('mb-1 h-[.0625rem] w-full', projectBackground)} />
                  </div>
                  <p className="text-justify indent-5 text-sm font-medium text-white/30">
                    {t(description)}
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <div className="flex w-full items-end justify-start gap-2">
                    <span className="font-medium">{t('techs')}</span>
                    <div className={clsx('mb-1 h-[.0625rem] w-full', projectBackground)} />
                  </div>
                  <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
                    {techs.map((tech, i) => (
                      <Tag key={`${kebabCase(title)}-${tech}-${i}`} text={tech} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-[.0625rem] w-full bg-neutral-100/20" />
              {(url || repository_url) && (
                <div className="flex w-full items-center justify-center gap-2 px-5 py-4">
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={url}
                      className={clsx(
                        'flex w-full items-center justify-center gap-2.5 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-500 focus:outline-none',
                        projectBackground
                      )}
                    >
                      <span>{t('visit')}</span>
                      <BiLinkExternal className="h-6 w-6 shrink-0" />
                    </a>
                  )}
                  {repository_url && (
                    <a
                      href={repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={repository_url}
                      className={clsx(
                        'flex w-full items-center justify-center gap-2.5 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-500 focus:outline-none',
                        projectBackground
                      )}
                    >
                      <span>{t('code')}</span>
                      <BsGithub className="h-6 w-6 shrink-0" />
                    </a>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProjectCardModal
