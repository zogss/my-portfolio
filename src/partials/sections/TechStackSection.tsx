import React from 'react'
import TitleEclipse from '~/components/svgs/TitleEclipse'
import TechStackBlock from '~/components/techStack/TechStackBlock'

const TechStackSection: React.FC = () => (
  <section
    id="tech-stack"
    className="relative flex min-h-screen w-full flex-col items-center justify-start gap-16 px-[15%] py-14"
  >
    <TitleEclipse className="absolute -top-[10%] h-auto" />
    <div className="flex w-full flex-col items-center gap-2.5 self-stretch">
      <div className="flex w-full items-center justify-center gap-6 py-[4.5rem]">
        <div className="h-16 w-full text-center mix-blend-overlay">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-[4rem] font-black leading-[100.5%] tracking-[.08rem] text-white/80 backdrop-blur-[.1766rem] text-shadow-primary">
            TECH STACK
          </h2>
        </div>
      </div>
      <h3 className="flex flex-col items-center gap-2.5 xl:max-w-[37.5rem]">
        <span className="text-center text-xl font-semibold">Explore my tech stack</span>
        <span className="text-center text-lg font-medium text-white/30">
          Browse the tools and technologies that power my web development journey. Each icon
          represents a piece of the puzzle, embodying innovation and efficiency in each project.
        </span>
      </h3>
    </div>
    <TechStackBlock />
  </section>
)

export default TechStackSection
