import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <article
      className={`flex justify-center items-center aspect-video text-xl sm:text-2xl capitalize border transition-all ${className}`}
    >
      {children}
    </article>
  )
}
