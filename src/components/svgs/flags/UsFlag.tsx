import React, { SVGProps } from 'react'

const UsFlag: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    enableBackground="new 0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#F5F5F5"
      d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V385.38  c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.621  C512,105.443,494.833,88.276,473.655,88.276z"
    />
    <g>
      <path
        fill="#ff4b4b"
        d="M2.109,114.08H509.89c-5.196-15.017-19.452-25.804-36.235-25.804H38.345   C21.561,88.276,7.306,99.063,2.109,114.08z"
      />
      <rect y="191.49" fill="#ff4b4b" width="512" height="25.803" />{' '}
      <rect y="139.88" fill="#ff4b4b" width="512" height="25.803" />{' '}
      <path fill="#ff4b4b" d="M0,260.074c0,4.875,3.953,8.828,8.828,8.828H512v-25.804H0V260.074z" />
      <rect y="346.32" fill="#ff4b4b" width="512" height="25.804" />{' '}
      <path
        fill="#ff4b4b"
        d="M509.891,397.92H2.109c5.197,15.017,19.453,25.804,36.236,25.804h435.31   C490.439,423.724,504.694,412.937,509.891,397.92z"
      />
      <rect y="294.71" fill="#ff4b4b" width="512" height="25.803" />
    </g>
    <path
      fill="#41479B"
      d="M8.828,268.902h220.69c4.875,0,8.828-3.953,8.828-8.828V97.103c0-4.876-3.953-8.828-8.828-8.828  H38.345C17.167,88.276,0,105.443,0,126.621v133.453C0,264.95,3.953,268.902,8.828,268.902z"
    />
  </svg>
)

export default UsFlag
