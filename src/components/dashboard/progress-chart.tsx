'use client'

import { useState } from 'react'

export function ProgressChart() {
  const [data] = useState(
    Array.from({ length: 7 }).map(() => ({
      height: 40 + Math.random() * 140,
      value: Math.floor((40 + Math.random() * 140) * 10),
    })),
  )

  return (
    <div className="animate-fade-up animate-once flex h-[200px] items-end gap-2">
      {data.map((item, i) => (
        <div key={i} className="group relative">
          <div className="bg-primary text-primary-foreground absolute -top-8 left-1/2 -translate-x-1/2 transform rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
            {item.value}kg
          </div>
          <div
            className="from-primary to-primary/60 w-full rounded-t bg-gradient-to-t"
            style={{ height: `${item.height}px`, width: '24px' }}
          />
        </div>
      ))}
    </div>
  )
}
