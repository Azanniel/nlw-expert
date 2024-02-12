import { Link, LinkProps } from 'expo-router'

import { cn } from '@/utils/merge-class'

interface LinkButtonProps extends LinkProps<string> {
  title: string
}

export function LinkButton({ title, className, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        'text-center font-body text-base text-slate-300',
        className,
      )}
      {...props}
    >
      {title}
    </Link>
  )
}
