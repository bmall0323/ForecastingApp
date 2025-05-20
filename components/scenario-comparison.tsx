"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Plus, Copy, Trash, Edit } from "lucide-react"

// Sample scenario data
const scenarios = [
  {
    id: "baseline",
    name: "Baseline",
    description: "Current forecast with no adjustments",
    isBaseline: true,
    data: [
      { month: "Jul", value: 1200 },
      { month: "Aug", value: 1300 },
      { month: "Sep", value: 1250 },
      { month: "Oct", value: 1400 },
      { month: "Nov", value: 1600 },
      { month: "Dec", value: 1800 },
    ],
  },
  {
    id: "optimistic",
    name: "Optimistic",
    description: "Assumes strong economic growth and successful marketing",
    isBaseline: false,
    data: [
      { month: "Jul", value: 1250 },
      { month: "Aug", value: 1400 },
      { month: "Sep", value: 1350 },
      { month: "Oct", value: 1550 },
      { month: "Nov", value: 1800 },
      { month: "Dec", value: 2100 },
    ],
  },
  {
    id: "pessimistic",
    name: "Pessimistic",
    description: "Assumes economic downturn and increased competition",
    isBaseline: false,
    data: [
      { month: "Jul", value: 1150 },
      { month: "Aug", value: 1200 },
      { month: "Sep", value: 1100 },
      { month: "Oct", value: 1250 },
      { month: "Nov", value: 1400 },
      { month: "Dec", value: 1500 },
    ],
  },
]

// Combine all scenarios for comparison view
const comparisonData = scenarios[0].data.map((item) => {
  const result = { month: item.month }
  scenarios.forEach((scenario) => {
    const matchingItem = scenario.data.find((d) => d.month === item.month)
    result[scenario.name] = matchingItem ? matchingItem.value : 0
  })
  return result
})

export default function ScenarioComparison() {
  const [activeTab, setActiveTab] = useState("comparison")
  const [activeScenarios, setActiveScenarios] = useState(scenarios)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scenario Planning</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Scenario
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="details">Scenario Details</TabsTrigger>
          <TabsTrigger value="impact">Business Impact</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>Compare different forecast scenarios side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Baseline" fill="#8884d8" />
                    <Bar dataKey="Optimistic" fill="#82ca9d" />
                    <Bar dataKey="Pessimistic" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeScenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{scenario.name}</CardTitle>
                    <div className="flex gap-1">
                      {!scenario.isBaseline && (
                        <>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">6-month total:</span>
                      <span className="font-medium">
                        {scenario.data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peak month:</span>
                      <span className="font-medium">
                        {
                          scenario.data.reduce((max, item) => (item.value > max.value ? item : max), scenario.data[0])
                            .month
                        }
                      </span>
                    </div>
                    {!scenario.isBaseline && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">vs Baseline:</span>
                        <span
                          className={`font-medium ${scenario.id === "optimistic" ? "text-green-500" : "text-red-500"}`}
                        >
                          {scenario.id === "optimistic" ? "+15.2%" : "-12.8%"}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Details</CardTitle>
              <CardDescription>View and edit the parameters for each scenario</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section would contain detailed parameter settings for each scenario.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Business Impact Analysis</CardTitle>
              <CardDescription>Analyze the financial and operational impact of each scenario</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This section would show revenue projections, inventory requirements, and other business metrics for each
                scenario.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Export your scenarios and forecasts in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section would provide options to export data to Excel, PDF, or other systems.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
