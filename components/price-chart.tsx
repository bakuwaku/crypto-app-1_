"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface PriceChartProps {
  data?: number[]
  positive?: boolean
}

export function PriceChart({ data = generateRandomData(), positive = true }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height - (data[0] / 100) * height)

    for (let i = 1; i < data.length; i++) {
      const x = (i / (data.length - 1)) * width
      const y = height - (data[i] / 100) * height
      ctx.lineTo(x, y)
    }

    // Style line
    ctx.strokeStyle = positive ? "#22c55e" : "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under line
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    // Style fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, positive ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, positive])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <canvas ref={canvasRef} width={300} height={100} className="w-full h-auto" />
      </CardContent>
    </Card>
  )
}

function generateRandomData(length = 20): number[] {
  const data = []
  let value = 50 + Math.random() * 20

  for (let i = 0; i < length; i++) {
    value += (Math.random() - 0.5) * 10
    value = Math.max(10, Math.min(90, value))
    data.push(value)
  }

  return data
}
