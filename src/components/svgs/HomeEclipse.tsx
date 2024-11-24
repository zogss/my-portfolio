import React, {SVGProps} from 'react';

const HomeEclipse: React.FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width="2006"
    height="868"
    viewBox="0 0 2006 868"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g filter="url(#filter0_f_371_1241)">
      <path
        d="M1738.06 652.134C1792.56 602.387 1814.84 547.916 1802.84 493.785C1790.84 439.653 1744.94 387.618 1669.42 342.517C1593.89 297.415 1491.19 260.711 1370.86 235.815C1250.52 210.919 1116.47 198.64 981.142 200.119C845.819 201.599 713.624 216.788 596.844 244.276C480.064 271.764 382.49 310.657 313.191 357.342C243.893 404.027 205.118 456.987 200.473 511.3C195.828 565.614 225.462 619.517 286.621 668H1002.4L1738.06 652.134Z"
        fill="url(#paint0_radial_371_1241)"
      />
      <path
        d="M1738.06 652.134C1792.56 602.387 1814.84 547.916 1802.84 493.785C1790.84 439.653 1744.94 387.618 1669.42 342.517C1593.89 297.415 1491.19 260.711 1370.86 235.815C1250.52 210.919 1116.47 198.64 981.142 200.119C845.819 201.599 713.624 216.788 596.844 244.276C480.064 271.764 382.49 310.657 313.191 357.342C243.893 404.027 205.118 456.987 200.473 511.3C195.828 565.614 225.462 619.517 286.621 668H1002.4L1738.06 652.134Z"
        fill="url(#paint1_linear_371_1241)"
        fillOpacity="0.4"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_371_1241"
        x="0"
        y="0"
        width="2006"
        height="868"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="100"
          result="effect1_foregroundBlur_371_1241"
        />
      </filter>
      <radialGradient
        id="paint0_radial_371_1241"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(887.078 399.266) rotate(75.4134) scale(460.295 1166.14)">
        <stop stopColor="#621ABE" />
        <stop offset="1" stopColor="#24214B" stopOpacity="0" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_371_1241"
        x1="1229.41"
        y1="523.043"
        x2="638.178"
        y2="504.814"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF9C54" />
        <stop offset="0.459917" stopColor="white" stopOpacity="0.540083" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default HomeEclipse;
