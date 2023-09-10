import clsx from 'clsx'
import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import AnimatedError from './AnimatedError'

interface InputProps {
  children: React.ReactNode
  className?: string
}
const Input: React.FC<InputProps> = ({ children, className }) => (
  <div className={clsx('flex flex-col', className)}>{children}</div>
)

Input.displayName = 'Input'

type InputInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  error?: string
  label?: string
  labelClassName?: string
}
const InputInput = forwardRef<HTMLInputElement, InputInputProps>(
  ({ name, error, label, labelClassName, ...rest }, ref) => (
    <>
      {label && (
        <label htmlFor={name} className={clsx('sr-only', labelClassName)}>
          {label}
        </label>
      )}
      <input id={name} {...rest} ref={ref} name={name} />
      <AnimatedError error={error} />
    </>
  )
)

InputInput.displayName = 'InputInput'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  error?: string
  label?: string
  labelClassName?: string
}
const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, error, label, labelClassName, ...rest }, ref) => (
    <>
      {label && (
        <label htmlFor={name} className={clsx('sr-only', labelClassName)}>
          {label}
        </label>
      )}
      <textarea id={name} {...rest} ref={ref} name={name} />
      <AnimatedError error={error} />
    </>
  )
)

TextAreaInput.displayName = 'TextAreaInput'

export default Object.assign(Input, {
  Input: InputInput,
  TextArea: TextAreaInput,
})
