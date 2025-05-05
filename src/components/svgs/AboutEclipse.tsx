import React, { SVGProps } from 'react';

const AboutEclipse: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1474"
    height="1164"
    viewBox="0 0 1474 1164"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_371_1242)">
      <path
        d="M395.09 421.5C132.59 421.5 42.5901 200 727.09 200C1318.09 200 1273.09 520 1273.09 782.5C1273.09 1045 998.59 1016.5 986.09 729.5C973.59 442.5 813.609 421.5 395.09 421.5Z"
        fill="url(#paint0_linear_371_1242)"
      />
      <path
        d="M395.09 421.5C132.59 421.5 42.5901 200 727.09 200C1318.09 200 1273.09 520 1273.09 782.5C1273.09 1045 998.59 1016.5 986.09 729.5C973.59 442.5 813.609 421.5 395.09 421.5Z"
        fill="url(#paint1_linear_371_1242)"
        fillOpacity="0.4"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_371_1242"
        x="0"
        y="0"
        width="1473.88"
        height="1163.19"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="100"
          result="effect1_foregroundBlur_371_1242"
        />
      </filter>
      <linearGradient
        id="paint0_linear_371_1242"
        x1="199.938"
        y1="265.826"
        x2="1273.94"
        y2="657.826"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#621ABE" />
        <stop offset="1" stopColor="#24214B" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_371_1242"
        x1="969.438"
        y1="199.826"
        x2="199.938"
        y2="445.326"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF9C54" />
        <stop offset="0.427083" stopColor="white" stopOpacity="0.5401" />
        <stop offset="1" stopColor="#FF9C54" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default AboutEclipse;
