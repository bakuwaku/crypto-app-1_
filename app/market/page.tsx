"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PriceChart } from "@/components/price-chart"
import { allCryptos } from "@/lib/data"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("marketCap")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const filteredCryptos = allCryptos
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market</h1>
        <p className="text-muted-foreground">Explore cryptocurrency prices, market cap, and trading volume</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cryptocurrencies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                Price
                {sortBy === "price" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("change24h")}>
                24h %
                {sortBy === "change24h" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("marketCap")}>
                Market Cap
                {sortBy === "marketCap" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("volume24h")}>
                Volume (24h)
                {sortBy === "volume24h" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 inline h-4 w-4" />
                  ) : (
                    <ArrowDown className="ml-1 inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="hidden lg:table-cell">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCryptos.map((crypto, index) => (
              <TableRow key={crypto.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image
                      src={crypto.image || "/placeholder.svg"}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${crypto.price.toLocaleString()}</TableCell>
                <TableCell className={cn(crypto.change24h >= 0 ? "text-green-500" : "text-red-500")}>
                  {crypto.change24h >= 0 ? "+" : ""}
                  {crypto.change24h}%
                </TableCell>
                <TableCell className="hidden md:table-cell">${(crypto.marketCap / 1000000000).toFixed(2)}B</TableCell>
                <TableCell className="hidden md:table-cell">${(crypto.volume24h / 1000000000).toFixed(2)}B</TableCell>
                <TableCell className="hidden lg:table-cell w-[150px]">
                  <PriceChart positive={crypto.change24h >= 0} data={undefined} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
