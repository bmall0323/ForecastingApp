import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export default function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">DF</span>
          </div>
          <h1 className="text-xl font-bold">Demand Forecaster</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <ModeToggle />
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
