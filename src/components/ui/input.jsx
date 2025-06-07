import * as React from "react"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return <input type={type} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring ${className}`} ref={ref} {...props} />
})
Input.displayName = "Input"
export { Input }
