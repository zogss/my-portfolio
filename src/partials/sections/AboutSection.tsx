import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import AboutEclipse from '~/components/svgs/AboutEclipse'

const AboutSection: React.FC = () => (
  <section
    id="about"
    className="relative flex min-h-screen w-full flex-col items-center justify-start gap-16 px-[15%] py-14"
  >
    <AboutEclipse className="absolute -top-[10%] h-auto w-[80%] overflow-hidden" />
    <div className="flex w-full items-center justify-center gap-6 py-[72px]">
      <div className="h-16 w-full text-center mix-blend-overlay">
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[64px] font-black leading-[100.5%] tracking-[1.28px] text-white/80 backdrop-blur-[2.824876308441162px] text-shadow-primary">
          ABOUT ME
        </h2>
      </div>
    </div>
    <div className="flex w-full items-center justify-between gap-16">
      <div className="relative p-3">
        <StaticImage
          src="../../images/about_image.jpg"
          alt="About image"
          className="z-[1] h-[346px] w-[450px] rounded-3xl shadow-2xl 2xl:h-[400px] 2xl:w-[550px]"
        />
        <div className="absolute inset-0 bg-black/70 blur-3xl" />
      </div>
      <div>
        <h3 className="text-lg text-neutral-100/40">
          <span className="mb-[18px] block text-2xl font-bold text-neutral-100">
            Dedicated software engineer residing in Maceió, Alagoas, Brazil.
          </span>
          <p className="mb-3">
            I&apos;m 20 years old with highly experience in creating attractive and functional user
            interfaces. Over the past two years, I have worked for several companies and had the
            opportunity to contribute to the development of exciting web projects.
          </p>
          <p>
            My strength lies in creating web experiences that not only meet user needs but also
            exceed their expectations. I&apos;m dedicated to collaborative problem-solving, valuing
            diverse perspectives and actively seeking innovative solutions. My goal is to leverage
            my technical proficiency and interpersonal skills to drive successful projects, ensuring
            exceptional outcomes for users.
          </p>
        </h3>
      </div>
    </div>
  </section>
)

export default AboutSection
