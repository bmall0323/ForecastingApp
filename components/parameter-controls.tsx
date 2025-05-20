"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ParameterControls() {
  const [parameters, setParameters] = useState({
    economicGrowth: [2.5], // percentage
    marketingImpact: [3.0], // percentage
    seasonalityStrength: [1.0], // multiplier
    competitorActivity: [0.5], // scale 0-1
    includeWeather: true,
    includeHolidays: true,
    includePromos: true,
  })

  const handleSliderChange = (name, value) => {
    setParameters({
      ...parameters,
      [name]: value,
    })
  }

  const handleSwitchChange = (name, checked) => {
    setParameters({
      ...parameters,
      [name]: checked,
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Forecast Parameters</CardTitle>
        <CardDescription>Adjust parameters to see how they affect the forecast</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="economicGrowth">Economic Growth</Label>
              <span className="text-sm">{parameters.economicGrowth[0]}%</span>
            </div>
            <Slider
              id="economicGrowth"
              min={-2}
              max={5}
              step={0.1}
              value={parameters.economicGrowth}
              onValueChange={(value) => handleSliderChange("economicGrowth", value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="marketingImpact">Marketing Impact</Label>
              <span className="text-sm">{parameters.marketingImpact[0]}%</span>
            </div>
            <Slider
              id="marketingImpact"
              min={0}
              max={10}
              step={0.1}
              value={parameters.marketingImpact}
              onValueChange={(value) => handleSliderChange("marketingImpact", value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="seasonalityStrength">Seasonality Strength</Label>
              <span className="text-sm">×{parameters.seasonalityStrength[0]}</span>
            </div>
            <Slider
              id="seasonalityStrength"
              min={0}
              max={2}
              step={0.1}
              value={parameters.seasonalityStrength}
              onValueChange={(value) => handleSliderChange("seasonalityStrength", value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="competitorActivity">Competitor Activity</Label>
              <span className="text-sm">{Math.round(parameters.competitorActivity[0] * 100)}%</span>
            </div>
            <Slider
              id="competitorActivity"
              min={0}
              max={1}
              step={0.05}
              value={parameters.competitorActivity}
              onValueChange={(value) => handleSliderChange("competitorActivity", value)}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="includeWeather" className="cursor-pointer">
              Include Weather Effects
            </Label>
            <Switch
              id="includeWeather"
              checked={parameters.includeWeather}
              onCheckedChange={(checked) => handleSwitchChange("includeWeather", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="includeHolidays" className="cursor-pointer">
              Include Holidays
            </Label>
            <Switch
              id="includeHolidays"
              checked={parameters.includeHolidays}
              onCheckedChange={(checked) => handleSwitchChange("includeHolidays", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="includePromos" className="cursor-pointer">
              Include Promotions
            </Label>
            <Switch
              id="includePromos"
              checked={parameters.includePromos}
              onCheckedChange={(checked) => handleSwitchChange("includePromos", checked)}
            />
          </div>
        </div>

        <Button className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Update Forecast
        </Button>
      </CardContent>
    </Card>
  )
}
