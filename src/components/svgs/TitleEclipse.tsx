import React, { SVGProps } from 'react';

const TitleEclipse: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="1762"
    height="567"
    viewBox="0 0 1762 567"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_371_1243)">
      <path
        d="M1504.38 361.338C1550.6 343.587 1569.5 324.149 1559.32 304.833C1549.14 285.517 1510.22 266.949 1446.17 250.855C1382.12 234.761 1295.02 221.664 1192.97 212.78C1090.92 203.896 977.227 199.515 862.463 200.043C747.7 200.57 635.589 205.991 536.552 215.799C437.514 225.608 354.765 239.487 295.994 256.146C237.224 272.804 204.341 291.703 200.401 311.084C196.461 330.465 221.593 349.699 273.46 367H880.488L1504.38 361.338Z"
        fill="url(#paint0_radial_371_1243)"
      />
      <path
        d="M1504.38 361.338C1550.6 343.587 1569.5 324.149 1559.32 304.833C1549.14 285.517 1510.22 266.949 1446.17 250.855C1382.12 234.761 1295.02 221.664 1192.97 212.78C1090.92 203.896 977.227 199.515 862.463 200.043C747.7 200.57 635.589 205.991 536.552 215.799C437.514 225.608 354.765 239.487 295.994 256.146C237.224 272.804 204.341 291.703 200.401 311.084C196.461 330.465 221.593 349.699 273.46 367H880.488L1504.38 361.338Z"
        fill="url(#paint1_linear_371_1243)"
        fillOpacity="0.55"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_371_1243"
        x="0"
        y="0"
        width="1762"
        height="567"
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
          result="effect1_foregroundBlur_371_1243"
        />
      </filter>
      <radialGradient
        id="paint0_radial_371_1243"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(782.69 271.106) rotate(58.2645) scale(186.901 869.114)"
      >
        <stop stopColor="#621ABE" />
        <stop offset="1" stopColor="#24214B" stopOpacity="0.5" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_371_1243"
        x1="1073.01"
        y1="315.274"
        x2="573.809"
        y2="278.695"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF9C54" />
        <stop offset="0.459917" stopColor="white" stopOpacity="0.540083" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default TitleEclipse;
