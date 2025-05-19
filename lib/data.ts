export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  image: string
}

export const trendingCryptos: Cryptocurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 68423.12,
    change24h: 2.34,
    marketCap: 1345678901234,
    volume24h: 32456789012,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3521.45,
    change24h: 1.56,
    marketCap: 423456789012,
    volume24h: 12345678901,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.78,
    change24h: 5.67,
    marketCap: 56789012345,
    volume24h: 3456789012,
    image: "/placeholder.svg?height=32&width=32",
  },
]

export const allCryptos: Cryptocurrency[] = [
  ...trendingCryptos,
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    change24h: -1.23,
    marketCap: 15678901234,
    volume24h: 1234567890,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "ripple",
    name: "Ripple",
    symbol: "XRP",
    price: 0.56,
    change24h: 0.78,
    marketCap: 28901234567,
    volume24h: 2345678901,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 6.78,
    change24h: -2.45,
    marketCap: 7890123456,
    volume24h: 890123456,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    change24h: 3.45,
    marketCap: 16789012345,
    volume24h: 1678901234,
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    price: 34.56,
    change24h: 4.56,
    marketCap: 11234567890,
    volume24h: 1123456789,
    image: "/placeholder.svg?height=32&width=32",
  },
]

export interface Alert {
  id: string
  cryptoId: string
  cryptoName: string
  cryptoSymbol: string
  targetPrice: number
  condition: "above" | "below"
  active: boolean
}

export const userAlerts: Alert[] = [
  {
    id: "alert1",
    cryptoId: "bitcoin",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    targetPrice: 70000,
    condition: "above",
    active: true,
  },
  {
    id: "alert2",
    cryptoId: "ethereum",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    targetPrice: 3000,
    condition: "below",
    active: true,
  },
  {
    id: "alert3",
    cryptoId: "solana",
    cryptoName: "Solana",
    cryptoSymbol: "SOL",
    targetPrice: 150,
    condition: "above",
    active: false,
  },
]
