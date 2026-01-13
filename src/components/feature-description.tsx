import React from 'react'

type FeatureDescriptionProps = {
  items: string[]
}
export const FeatureDescription = ({ items }: FeatureDescriptionProps) => {
  return (
    <article className="card flex flex-col gap-4 bg-neutral-50 px-3 py-4">
      {items.map((item, index) => (
        <div className="flex items-center gap-3" key={index}>
          <div className="nb-shadow flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-neutral-100 text-sm font-medium">
            {index + 1}
          </div>
          <p className="flex-1 font-medium">{item}</p>
        </div>
      ))}
    </article>
  )
}
