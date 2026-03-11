import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/[0.25] backdrop-blur-[20px]",
        "border border-white/[0.3]",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]",
        hover && "hover:bg-white/[0.35] hover:border-white/[0.4] hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.18)]",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
      }}
    >
      {/* Glass reflection effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface GlassButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function GlassButton({ children, className, onClick }: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl px-6",
        "bg-white/[0.1] backdrop-blur-[30px]",
        "border border-white/[0.2]",
        "shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]",
        "hover:bg-white/[0.15] hover:border-white/[0.3] hover:shadow-[0_4px_30px_0_rgba(0,0,0,0.15)]",
        "active:scale-[0.98]",
        "transition-all duration-200 ease-out",
        "text-sm font-bold text-neutral-900",
        className
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
      }}
    >
      {/* Glass shine effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-1.5">
        {children}
      </span>
    </button>
  )
}
