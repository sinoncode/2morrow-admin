import {
  Users,
  Sparkles,
  TrendingUp,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const matchingBuyers = [
  {
    id: 1,
    name: "John Anderson",
    budget: "$1.2M",
    match: 95,
    location: "Downtown Dubai",
  },
  {
    id: 2,
    name: "Sarah Williams",
    budget: "$950K",
    match: 89,
    location: "Dubai Marina",
  },
  {
    id: 3,
    name: "Michael Chen",
    budget: "$1.5M",
    match: 82,
    location: "Business Bay",
  },
]

const similarProperties = [
  {
    id: 1,
    title: "Luxury Marina Penthouse",
    price: "$1.3M",
  },
  {
    id: 2,
    title: "Beachfront Apartment",
    price: "$1.1M",
  },
  {
    id: 3,
    title: "Smart Home Villa",
    price: "$1.8M",
  },
]

export default function MatchingStep() {
  return (
    <div className="space-y-6">
      {/* AI Matching Overview */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Property Match Analysis
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Buyer Match Score
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                92%
              </h3>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Investment Score
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                88%
              </h3>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Demand Score
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                94%
              </h3>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Lead Potential
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                87%
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Breakdown */}

      <Card>
        <CardHeader>
          <CardTitle>
            Property Compatibility
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex justify-between">
              <span>Budget Compatibility</span>
              <span>95%</span>
            </div>

            <Progress value={95} />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Location Demand</span>
              <span>89%</span>
            </div>

            <Progress value={89} />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Amenities Match</span>
              <span>93%</span>
            </div>

            <Progress value={93} />
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Property Type Demand</span>
              <span>90%</span>
            </div>

            <Progress value={90} />
          </div>
        </CardContent>
      </Card>

      {/* Matching Buyers */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recommended Buyers
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {matchingBuyers.map((buyer) => (
            <div
              key={buyer.id}
              className="
                rounded-xl
                border
                p-4
                transition-all
                hover:shadow-md
              "
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-semibold">
                    {buyer.name}
                  </h4>

                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {buyer.budget}
                    </Badge>

                    <Badge variant="outline">
                      <MapPin className="mr-1 h-3 w-3" />
                      {buyer.location}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Match Score
                  </p>

                  <p className="text-2xl font-bold text-primary">
                    {buyer.match}%
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <Progress value={buyer.match} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Similar Properties */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Similar Properties
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {similarProperties.map((property) => (
            <div
              key={property.id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-4
              "
            >
              <div>
                <h4 className="font-medium">
                  {property.title}
                </h4>

                <p className="text-sm text-muted-foreground">
                  Comparable Market Listing
                </p>
              </div>

              <Badge>
                {property.price}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Investment Analysis */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Investment Analysis
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Estimated ROI
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                8.7%
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Rental Yield
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                6.3%
              </h3>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">
                Appreciation Potential
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                High
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}

      <Card>
        <CardHeader>
          <CardTitle>
            Smart Recommendations
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            "Increase listing visibility to improve lead generation.",
            "Properties with a virtual tour receive approximately 30% more inquiries.",
            "Current pricing is aligned with market trends.",
            "Strong demand detected in this area during the last 60 days.",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />

              <p className="text-sm">
                {item}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />
    </div>
  )
}