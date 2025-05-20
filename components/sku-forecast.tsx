"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Search, Download, TrendingUp, TrendingDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample SKU data
const skuData = [
  {
    id: "SKU001",
    name: "Premium Widget",
    category: "Widgets",
    currentStock: 342,
    reorderPoint: 150,
    trend: "up",
    forecastAccuracy: 92,
    data: [
      { month: "Jul", forecast: 120, actual: 125 },
      { month: "Aug", forecast: 130, actual: 128 },
      { month: "Sep", forecast: 125, actual: null },
      { month: "Oct", forecast: 140, actual: null },
      { month: "Nov", forecast: 160, actual: null },
      { month: "Dec", forecast: 180, actual: null },
    ],
  },
  {
    id: "SKU002",
    name: "Standard Widget",
    category: "Widgets",
    currentStock: 523,
    reorderPoint: 200,
    trend: "stable",
    forecastAccuracy: 88,
    data: [
      { month: "Jul", forecast: 210, actual: 205 },
      { month: "Aug", forecast: 215, actual: 220 },
      { month: "Sep", forecast: 220, actual: null },
      { month: "Oct", forecast: 225, actual: null },
      { month: "Nov", forecast: 230, actual: null },
      { month: "Dec", forecast: 240, actual: null },
    ],
  },
  {
    id: "SKU003",
    name: "Economy Widget",
    category: "Widgets",
    currentStock: 187,
    reorderPoint: 100,
    trend: "down",
    forecastAccuracy: 85,
    data: [
      { month: "Jul", forecast: 95, actual: 90 },
      { month: "Aug", forecast: 90, actual: 85 },
      { month: "Sep", forecast: 85, actual: null },
      { month: "Oct", forecast: 80, actual: null },
      { month: "Nov", forecast: 75, actual: null },
      { month: "Dec", forecast: 70, actual: null },
    ],
  },
  {
    id: "SKU004",
    name: "Deluxe Gadget",
    category: "Gadgets",
    currentStock: 128,
    reorderPoint: 75,
    trend: "up",
    forecastAccuracy: 94,
    data: [
      { month: "Jul", forecast: 65, actual: 70 },
      { month: "Aug", forecast: 75, actual: 80 },
      { month: "Sep", forecast: 85, actual: null },
      { month: "Oct", forecast: 95, actual: null },
      { month: "Nov", forecast: 105, actual: null },
      { month: "Dec", forecast: 115, actual: null },
    ],
  },
  {
    id: "SKU005",
    name: "Standard Gadget",
    category: "Gadgets",
    currentStock: 256,
    reorderPoint: 120,
    trend: "up",
    forecastAccuracy: 91,
    data: [
      { month: "Jul", forecast: 110, actual: 115 },
      { month: "Aug", forecast: 120, actual: 125 },
      { month: "Sep", forecast: 130, actual: null },
      { month: "Oct", forecast: 140, actual: null },
      { month: "Nov", forecast: 150, actual: null },
      { month: "Dec", forecast: 160, actual: null },
    ],
  },
  {
    id: "SKU006",
    name: "Premium Accessory",
    category: "Accessories",
    currentStock: 412,
    reorderPoint: 200,
    trend: "stable",
    forecastAccuracy: 89,
    data: [
      { month: "Jul", forecast: 180, actual: 175 },
      { month: "Aug", forecast: 185, actual: 180 },
      { month: "Sep", forecast: 185, actual: null },
      { month: "Oct", forecast: 190, actual: null },
      { month: "Nov", forecast: 195, actual: null },
      { month: "Dec", forecast: 200, actual: null },
    ],
  },
]

export default function SkuForecast() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSku, setSelectedSku] = useState(skuData[0])

  // Filter SKUs based on search term and category
  const filteredSkus = skuData.filter((sku) => {
    const matchesSearch =
      sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || sku.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(skuData.map((sku) => sku.category))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SKU-Level Forecasts</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>SKU Forecast Data</CardTitle>
                  <CardDescription>View and analyze forecasts by individual SKU</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search SKUs..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU ID</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Current Stock</TableHead>
                      <TableHead className="text-right">Forecast Accuracy</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSkus.length > 0 ? (
                      filteredSkus.map((sku) => (
                        <TableRow
                          key={sku.id}
                          className={`cursor-pointer ${selectedSku.id === sku.id ? "bg-muted/50" : ""}`}
                          onClick={() => setSelectedSku(sku)}
                        >
                          <TableCell className="font-medium">{sku.id}</TableCell>
                          <TableCell>{sku.name}</TableCell>
                          <TableCell>{sku.category}</TableCell>
                          <TableCell className="text-right">
                            <span className={sku.currentStock < sku.reorderPoint ? "text-red-500" : ""}>
                              {sku.currentStock}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{sku.forecastAccuracy}%</TableCell>
                          <TableCell className="text-right">
                            {sku.trend === "up" ? (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Up
                              </Badge>
                            ) : sku.trend === "down" ? (
                              <Badge className="bg-red-500 hover:bg-red-600">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                Down
                              </Badge>
                            ) : (
                              <Badge variant="outline">Stable</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No SKUs found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{selectedSku.name}</CardTitle>
              <CardDescription>
                {selectedSku.id} - {selectedSku.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedSku.data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Actual"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#82ca9d"
                      name="Forecast"
                      strokeWidth={2}
                      strokeDasharray={selectedSku.data.some((d) => d.actual === null) ? "5 5" : undefined}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Stock</p>
                    <p className="text-lg font-medium">{selectedSku.currentStock}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Reorder Point</p>
                    <p className="text-lg font-medium">{selectedSku.reorderPoint}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                    <p className="text-lg font-medium">{selectedSku.forecastAccuracy}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">6-Month Trend</p>
                    <p className="text-lg font-medium flex items-center">
                      {selectedSku.trend === "up" ? (
                        <>
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-green-500">Increasing</span>
                        </>
                      ) : selectedSku.trend === "down" ? (
                        <>
                          <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-red-500">Decreasing</span>
                        </>
                      ) : (
                        "Stable"
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Forecast Summary</p>
                  <p className="text-sm">
                    {selectedSku.trend === "up"
                      ? `${selectedSku.name} shows an upward trend with a forecast accuracy of ${selectedSku.forecastAccuracy}%. Consider increasing inventory levels.`
                      : selectedSku.trend === "down"
                        ? `${selectedSku.name} shows a downward trend with a forecast accuracy of ${selectedSku.forecastAccuracy}%. Consider reducing inventory levels.`
                        : `${selectedSku.name} shows a stable demand pattern with a forecast accuracy of ${selectedSku.forecastAccuracy}%. Maintain current inventory strategy.`}
                  </p>
                </div>
              </div>

              <Button className="w-full">View Detailed Analysis</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
