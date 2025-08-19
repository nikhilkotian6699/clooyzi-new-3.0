import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="flex bg-gray-950 border border-gray-800 text-white flex-col h-full transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <CardDescription className="flex-1 mb-4">{description}</CardDescription>
        <Button variant="outline" className="bg-gray-900 border border-gray-800 w-full mt-auto group">
          Learn More
          <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}

