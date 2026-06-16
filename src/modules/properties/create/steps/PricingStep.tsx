import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DollarSign,
  Home,
  BedDouble,
  Bath,
  Car,
  Building2,
} from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

const bedroomOptions = [
  "Studio",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6+",
]

const bathroomOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6+",
]

export default function PricingStep() {
  const { form, updateField } = usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Property Specifications */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Property Specifications
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Built-up Area (Sq Ft)</Label>

            <Input
              placeholder="4500"
              value={form.builtUpArea || ""}
              onChange={(e) =>
                updateField("builtUpArea", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Plot Area (Sq Ft)</Label>

            <Input
              placeholder="6000"
              value={form.plotArea || ""}
              onChange={(e) =>
                updateField("plotArea", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Property Age</Label>

            <Input
              placeholder="2 Years"
              value={form.propertyAge || ""}
              onChange={(e) =>
                updateField("propertyAge", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Year Built</Label>

            <Input
              placeholder="2024"
              value={form.yearBuilt || ""}
              onChange={(e) =>
                updateField("yearBuilt", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Bedrooms Bathrooms */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            Rooms & Capacity
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label>Bedrooms</Label>

            <div className="mt-3 flex flex-wrap gap-2">
              {bedroomOptions.map((room) => (
                <Button
                  key={room}
                  variant={
                    form.bedrooms === room
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateField("bedrooms", room)
                  }
                >
                  {room}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Bathrooms</Label>

            <div className="mt-3 flex flex-wrap gap-2">
              {bathroomOptions.map((room) => (
                <Button
                  key={room}
                  variant={
                    form.bathrooms === room
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateField("bathrooms", room)
                  }
                >
                  {room}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floor Information */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Floor Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Floor Number</Label>

            <Input
              placeholder="12"
              value={form.floorNumber || ""}
              onChange={(e) =>
                updateField("floorNumber", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Total Floors</Label>

            <Input
              placeholder="45"
              value={form.totalFloors || ""}
              onChange={(e) =>
                updateField("totalFloors", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Balconies</Label>

            <Input
              placeholder="2"
              value={form.balconies || ""}
              onChange={(e) =>
                updateField("balconies", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Elevators</Label>

            <Input
              placeholder="4"
              value={form.elevators || ""}
              onChange={(e) =>
                updateField("elevators", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Furnishing */}

      <Card>
        <CardHeader>
          <CardTitle>
            Furnishing & Ownership
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Furnishing Status</Label>

            <Select
              value={form.furnishing}
              onValueChange={(value) =>
                updateField("furnishing", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="furnished">
                  Fully Furnished
                </SelectItem>

                <SelectItem value="semi">
                  Semi Furnished
                </SelectItem>

                <SelectItem value="unfurnished">
                  Unfurnished
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ownership Type</Label>

            <Select
              value={form.ownershipType}
              onValueChange={(value) =>
                updateField("ownershipType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Ownership" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="freehold">
                  Freehold
                </SelectItem>

                <SelectItem value="leasehold">
                  Leasehold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Parking */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            Parking
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Covered Parking</Label>

            <Input
              placeholder="2"
              value={form.coveredParking || ""}
              onChange={(e) =>
                updateField(
                  "coveredParking",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Open Parking</Label>

            <Input
              placeholder="1"
              value={form.openParking || ""}
              onChange={(e) =>
                updateField(
                  "openParking",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Visitor Parking</Label>

            <Input
              placeholder="Available"
              value={form.visitorParking || ""}
              onChange={(e) =>
                updateField(
                  "visitorParking",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Pricing Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label>Property Price</Label>

            <Input
              placeholder="AED 8,500,000"
              value={form.price || ""}
              onChange={(e) =>
                updateField("price", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Price Per Sq Ft</Label>

            <Input
              placeholder="AED 1,888"
              value={form.pricePerSqft || ""}
              onChange={(e) =>
                updateField(
                  "pricePerSqft",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Maintenance Fee</Label>

            <Input
              placeholder="AED 25,000"
              value={form.maintenanceFee || ""}
              onChange={(e) =>
                updateField(
                  "maintenanceFee",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Security Deposit</Label>

            <Input
              placeholder="5%"
              value={form.securityDeposit || ""}
              onChange={(e) =>
                updateField(
                  "securityDeposit",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}

      <Card>
        <CardHeader>
          <CardTitle>
            Market Valuation & Investment
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Estimated ROI</Label>

            <Input
              placeholder="8.5%"
              value={form.roi || ""}
              onChange={(e) =>
                updateField("roi", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Rental Yield</Label>

            <Input
              placeholder="7%"
              value={form.rentalYield || ""}
              onChange={(e) =>
                updateField(
                  "rentalYield",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Market Value</Label>

            <Input
              placeholder="AED 8.8M"
              value={form.marketValue || ""}
              onChange={(e) =>
                updateField(
                  "marketValue",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}