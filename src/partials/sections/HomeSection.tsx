import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import SocialLinks from '~/components/SocialLinks'
import HomeEclipse from '~/components/svgs/HomeEclipse'

const HomeSection: React.FC = () => (
  <section
    id="home"
    className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-[15%]"
  >
    <HomeEclipse className="absolute overflow-hidden" />
    <div className="z-[1] flex w-full flex-col items-start justify-start gap-16">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="h-16 w-full mix-blend-overlay">
          <h2 className="absolute text-[64px] font-black leading-[100.5%] tracking-[1.28px] text-white/80 backdrop-blur-[2.824876308441162px] text-shadow-primary">
            SOFTWARE ENGINEER
          </h2>
        </div>
        <h2 className="text-slate-gray-300">
          <p className="w-full max-w-sm font-medium">
            Hi, I&apos;m <span className="font-bold text-white">Yan Lucas</span>, a dedicated
            software engineer with deep expertise in web development, delivering innovative
            solutions.
          </p>
        </h2>
      </div>
      <SocialLinks className="h-12 gap-2 !text-white/40" iconSize="lg" />
    </div>
    <div className="absolute right-[15%] flex h-auto w-[700px] justify-end rounded-2xl bg-gradient-to-l from-black/30 to-black/0">
      <StaticImage
        src="../../images/yan_main_photo.png"
        alt="Yan Lucas Photo"
        className="h-[566px] w-[318px]"
      />
    </div>
  </section>
)

export default HomeSection
