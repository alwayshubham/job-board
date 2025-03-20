import { Loader } from "lucide-react"
import { Button } from "./ui/button"

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button type="submit" disabled={props.disabled || loading} {...props}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  )
}
