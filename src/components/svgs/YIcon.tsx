import React, { SVGProps } from 'react'

const YIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="511"
    height="511"
    viewBox="0 -0.5 511 511"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <clipPath id="clip-path">
        <rect width="511" height="510" />
      </clipPath>
    </defs>
    <g clipPath="url(#clip-path)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M34,1V0H90L211,187h1l18-26v-1L126,1V0h56l76,115L334,0h56V1L212,274h-1L34,1M426,0h56V1L240,372V510H193V358ZM317,311h-1l-46,70V510h47V311"
      />
    </g>
  </svg>
)

export default YIcon
