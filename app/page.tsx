import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import ForecastChart from "@/components/forecast-chart"
import ParameterControls from "@/components/parameter-controls"
import DataSourcesPanel from "@/components/data-sources-panel"
import AIAssistant from "@/components/ai-assistant"
import ScenarioComparison from "@/components/scenario-comparison"
import SkuForecast from "@/components/sku-forecast"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex-1 container mx-auto py-6 space-y-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="sku-forecasts">SKU Forecasts</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ForecastChart />
              </div>
              <div>
                <ParameterControls />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <AIAssistant />
            </div>
          </TabsContent>

          <TabsContent value="sku-forecasts">
            <SkuForecast />
          </TabsContent>

          <TabsContent value="data-sources">
            <DataSourcesPanel />
          </TabsContent>

          <TabsContent value="scenarios">
            <ScenarioComparison />
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Configure application settings, user preferences, and model parameters.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
