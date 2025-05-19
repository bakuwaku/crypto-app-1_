import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoCard } from "@/components/crypto-card"
import { PriceChart } from "@/components/price-chart"
import { trendingCryptos } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your favorite cryptocurrencies and market trends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.14T</div>
            <p className="text-xs text-muted-foreground">+2.5% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78.9B</div>
            <p className="text-xs text-muted-foreground">-1.2% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.3%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <p className="text-xs text-muted-foreground">+23 from last 24h</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trendingCryptos.map((crypto) => (
              <div key={crypto.id} className="space-y-4">
                <CryptoCard crypto={crypto} />
                <PriceChart positive={crypto.change24h >= 0} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="gainers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Similar structure to trending, but with top gainers */}
            <div className="space-y-4">
              <CryptoCard crypto={trendingCryptos[2]} />
              <PriceChart positive={true} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="losers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Similar structure to trending, but with top losers */}
            <div className="space-y-4">
              <CryptoCard crypto={{ ...trendingCryptos[0], change24h: -1.2 }} />
              <PriceChart positive={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
