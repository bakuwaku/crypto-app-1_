"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertForm } from "@/components/alert-form"
import { userAlerts } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AlertsPage() {
  const { toast } = useToast()
  const [alerts, setAlerts] = useState(userAlerts)

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert)))

    const alert = alerts.find((a) => a.id === id)
    if (alert) {
      toast({
        title: alert.active ? "Alert disabled" : "Alert enabled",
        description: `${alert.cryptoName} price alert ${alert.active ? "disabled" : "enabled"}.`,
      })
    }
  }

  const deleteAlert = (id: string) => {
    const alert = alerts.find((a) => a.id === id)
    setAlerts(alerts.filter((alert) => alert.id !== id))

    if (alert) {
      toast({
        title: "Alert deleted",
        description: `${alert.cryptoName} price alert deleted.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Price Alerts</h1>
          <p className="text-muted-foreground">Get notified when cryptocurrency prices hit your targets</p>
        </div>
        <AlertForm />
      </div>

      {alerts.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cryptocurrency</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Target Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="font-medium">{alert.cryptoName}</div>
                    <div className="text-xs text-muted-foreground">{alert.cryptoSymbol}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {alert.condition === "above" ? (
                        <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      Price goes {alert.condition}
                    </div>
                  </TableCell>
                  <TableCell>${alert.targetPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                      <span className={cn("text-sm", alert.active ? "text-green-500" : "text-muted-foreground")}>
                        {alert.active ? (
                          <span className="flex items-center">
                            <Bell className="mr-1 h-3 w-3" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <BellOff className="mr-1 h-3 w-3" /> Inactive
                          </span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => deleteAlert(alert.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-4 text-lg font-medium">No alerts yet</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Create your first price alert to get notified when cryptocurrency prices hit your targets.
          </p>
          <AlertForm />
        </div>
      )}
    </div>
  )
}
