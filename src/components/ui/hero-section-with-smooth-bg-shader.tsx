"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
    colors?: string[]
    distortion?: number
    swirl?: number
    speed?: number
    offsetX?: number
    className?: string
    veilOpacity?: string
    children?: React.ReactNode
}

export function HeroSection({
    colors = ["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"],
    distortion = 0.8,
    swirl = 0.6,
    speed = 0.42,
    offsetX = 0.08,
    className = "",
    veilOpacity = "bg-white/20 dark:bg-black/25",
    children
}: HeroSectionProps) {
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => setMounted(true), 50)
        
        const update = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        update()
        window.addEventListener("resize", update)
        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", update)
        }
    }, [])

    return (
        <section className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center ${className}`}>
            {/* Static gradient background - always visible */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%, ${colors[4]} 100%)`
                }}
            />
            
            {/* Animated mesh gradient - fades in smoothly over static gradient */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <MeshGradient
                    width={dimensions.width}
                    height={dimensions.height}
                    colors={colors}
                    distortion={distortion}
                    swirl={swirl}
                    grainMixer={0}
                    grainOverlay={0}
                    speed={speed}
                    offsetX={offsetX}
                />
                <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
            </div>

            <div className="relative z-10 mx-auto w-full">
                {children}
            </div>
        </section>
    )
}
