'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <h1>Some Went Wrong Here!</h1>
  )
}
