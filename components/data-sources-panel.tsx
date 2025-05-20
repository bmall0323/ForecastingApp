"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, RefreshCw, CloudRain, Calendar, ShoppingBag, TrendingUp, Users } from "lucide-react"

const dataSources = [
  {
    id: "sales",
    name: "Historical Sales Data",
    description: "Sales transactions from your ERP system",
    type: "internal",
    lastUpdated: "2 hours ago",
    status: "active",
    icon: ShoppingBag,
  },
  {
    id: "weather",
    name: "Weather Data",
    description: "Historical and forecasted weather patterns",
    type: "external",
    lastUpdated: "1 day ago",
    status: "active",
    icon: CloudRain,
  },
  {
    id: "economic",
    name: "Economic Indicators",
    description: "GDP, inflation, and consumer confidence metrics",
    type: "external",
    lastUpdated: "1 week ago",
    status: "active",
    icon: TrendingUp,
  },
  {
    id: "holidays",
    name: "Holiday Calendar",
    description: "Global and regional holidays and events",
    type: "external",
    lastUpdated: "1 month ago",
    status: "active",
    icon: Calendar,
  },
  {
    id: "customer",
    name: "Customer Segments",
    description: "Customer demographic and behavioral data",
    type: "internal",
    lastUpdated: "3 days ago",
    status: "active",
    icon: Users,
  },
]

export default function DataSourcesPanel() {
  const [sources, setSources] = useState(dataSources)

  const toggleSource = (id) => {
    setSources(
      sources.map((source) =>
        source.id === id ? { ...source, status: source.status === "active" ? "inactive" : "active" } : source,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Sources</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <Card key={source.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <source.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                </div>
                <Badge variant={source.status === "active" ? "default" : "outline"}>
                  {source.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>{source.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Type: {source.type}</div>
                  <div className="text-muted-foreground">Updated: {source.lastUpdated}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`toggle-${source.id}`} className="sr-only">
                    Toggle {source.name}
                  </Label>
                  <Switch
                    id={`toggle-${source.id}`}
                    checked={source.status === "active"}
                    onCheckedChange={() => toggleSource(source.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
