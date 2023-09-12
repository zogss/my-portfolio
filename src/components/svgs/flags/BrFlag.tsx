import React, { SVGProps } from 'react'

const BrFlag: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    enableBackground="new 0 0 512 512"
    {...props}
  >
    <path
      fill="#029f2f"
      d="M473.655,88.275H38.345C17.167,88.275,0,105.442,0,126.62V385.38  c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V126.62  C512,105.442,494.833,88.275,473.655,88.275z"
    />
    <path
      fill="#f8c301"
      d="M251.41,135.207L65.354,248.458c-5.651,3.439-5.651,11.641,0,15.081L251.41,376.792  c2.819,1.716,6.36,1.716,9.18,0l186.056-113.252c5.651-3.439,5.651-11.641,0-15.081L260.59,135.207  C257.771,133.492,254.229,133.492,251.41,135.207z"
    />
    <circle fill="#012179" cx="256" cy="255.999" r="70.62" />
  </svg>
)

export default BrFlag
