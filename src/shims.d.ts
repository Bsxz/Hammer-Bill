import * as React from 'react'

declare module 'react' {
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    width?: string
    height?: string
  }
}
