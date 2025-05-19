import { ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Cryptocurrency } from "@/lib/data"

interface CryptoCardProps {
  crypto: Cryptocurrency
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.change24h >= 0

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={crypto.image || "/placeholder.svg"}
              alt={crypto.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">{crypto.name}</h3>
              <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">${crypto.price.toLocaleString()}</p>
            <p className={cn("text-sm flex items-center justify-end", isPositive ? "text-green-500" : "text-red-500")}>
              {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(crypto.change24h)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
