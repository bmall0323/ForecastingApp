"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from your API
const generateForecastData = (months = 12, baseValue = 1000, variance = 0.2, trend = 0.05) => {
  const data = []
  const now = new Date()
  let currentValue = baseValue

  // Historical data (past 6 months)
  for (let i = -6; i < 0; i++) {
    const date = new Date(now)
    date.setMonth(now.getMonth() + i)

    // Add some randomness to historical data
    const randomFactor = 1 + (Math.random() * variance * 2 - variance)
    const value = Math.round(currentValue * randomFactor)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      actual: value,
      forecast: null,
      lower: null,
      upper: null,
      isHistorical: true,
    })

    // Apply trend for next month's base
    currentValue = currentValue * (1 + trend)
  }

  // Current month (transition from historical to forecast)
  const currentDate = new Date(now)
  data.push({
    date: currentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    actual: Math.round(currentValue),
    forecast: Math.round(currentValue),
    lower: Math.round(currentValue * 0.9),
    upper: Math.round(currentValue * 1.1),
    isHistorical: false,
  })

  // Future forecast
  for (let i = 1; i < months - 6; i++) {
    const date = new Date(now)
    date.setMonth(now.getMonth() + i)

    // Apply trend and some randomness to forecast
    currentValue = currentValue * (1 + trend)
    const forecastValue = Math.round(currentValue)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      actual: null,
      forecast: forecastValue,
      lower: Math.round(forecastValue * 0.85),
      upper: Math.round(forecastValue * 1.15),
      isHistorical: false,
    })
  }

  return data
}

export default function ForecastChart() {
  const [data, setData] = useState([])
  const [chartType, setChartType] = useState("sales")

  useEffect(() => {
    // In a real app, this would be an API call
    setData(generateForecastData())
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Demand Forecast</CardTitle>
            <CardDescription>Historical and projected demand with confidence intervals</CardDescription>
          </div>
          <Tabs defaultValue="sales" onValueChange={setChartType}>
            <TabsList>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#8884d8"
                strokeWidth={2}
                name="Historical"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Forecast"
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="upper"
                stroke="#ffc658"
                strokeWidth={1}
                name="Upper Bound"
                strokeDasharray="3 3"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="#ff8042"
                strokeWidth={1}
                name="Lower Bound"
                strokeDasharray="3 3"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
