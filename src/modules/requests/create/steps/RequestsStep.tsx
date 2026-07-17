import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MapPin, Building2, Globe, Landmark } from "lucide-react"
import { useRequestCreationStore } from "../store/requestCreationStore"

export default function RequestsStep() {
  const { form, updateField } = useRequestCreationStore()

  return (
    <div className="space-y-6">
      {/* A. GENERAL REQUEST CRITERIA */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-blue-600 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            General Request Criteria
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm">Property Transaction Type</Label>
              <Select
                value={form.propertyTransactionType || ""}
                onValueChange={(v) => updateField("propertyTransactionType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm">Minimum Budget</Label>
              <Input
                type="number"
                placeholder="Budget min"
                value={form.minimumBudget || ""}
                onChange={(e) => updateField("minimumBudget", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Maximum Budget</Label>
              <Input
                type="number"
                placeholder="Budget max"
                value={form.maximumBudget || ""}
                onChange={(e) => updateField("maximumBudget", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Currency</Label>
              <Select
                value={form.currency || ""}
                onValueChange={(v) => updateField("currency", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. LOCATION CRITERIA */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-blue-600 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Criteria
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="mb-2 block text-sm">City</Label>
              <Input
                placeholder="City"
                value={form.city || ""}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Country</Label>
              <Input
                placeholder="Country"
                value={form.country || ""}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Zip Code</Label>
              <Input
                placeholder="Zip"
                value={form.zipCode || ""}
                onChange={(e) => updateField("zipCode", e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Search Radius</Label>
              <Input
                type="number"
                placeholder="Radius (km)"
                value={form.searchRadius || ""}
                onChange={(e) => updateField("searchRadius", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* C. PROPERTY DETAILS CRITERIA */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-blue-600 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Property Details Criteria
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Rooms */}
            <div>
              <Label className="mb-3 block text-sm font-medium">Rooms</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Rooms min"
                  value={form.minimumRooms || ""}
                  onChange={(e) => updateField("minimumRooms", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Rooms max"
                  value={form.maximumRooms || ""}
                  onChange={(e) => updateField("maximumRooms", e.target.value)}
                />
              </div>
            </div>

            {/* Livable Space */}
            <div>
              <Label className="mb-3 block text-sm font-medium">Livable Space</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Livable space min"
                  value={form.minimumLivableSpace || ""}
                  onChange={(e) => updateField("minimumLivableSpace", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Livable space max"
                  value={form.maximumLivableSpace || ""}
                  onChange={(e) => updateField("maximumLivableSpace", e.target.value)}
                />
              </div>
            </div>

            {/* Land Area */}
            <div>
              <Label className="mb-3 block text-sm font-medium">Land Area</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Surface land min"
                  value={form.minimumLandArea || ""}
                  onChange={(e) => updateField("minimumLandArea", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Surface land max"
                  value={form.maximumLandArea || ""}
                  onChange={(e) => updateField("maximumLandArea", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADDITIONAL CRITERIA */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-8">
          <h3 className="mb-8 text-lg font-semibold text-blue-600 flex items-center gap-2">
            <Landmark className="w-5 h-5" />
            Additional Criteria
          </h3>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* Bathrooms */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Bathroom(s)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumBathrooms || ""}
                    onChange={(e) => updateField("minimumBathrooms", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumBathrooms || ""}
                    onChange={(e) => updateField("maximumBathrooms", e.target.value)}
                  />
                </div>
              </div>

              {/* Terraces */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Terraces</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumTerraces || ""}
                    onChange={(e) => updateField("minimumTerraces", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumTerraces || ""}
                    onChange={(e) => updateField("maximumTerraces", e.target.value)}
                  />
                </div>
              </div>

              {/* Parking */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Parking spots</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumParkingSpots || ""}
                    onChange={(e) => updateField("minimumParkingSpots", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumParkingSpots || ""}
                    onChange={(e) => updateField("maximumParkingSpots", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* Price */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Price</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumPrice || ""}
                    onChange={(e) => updateField("minimumPrice", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumPrice || ""}
                    onChange={(e) => updateField("maximumPrice", e.target.value)}
                  />
                </div>
              </div>

              {/* Balconies */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Balconies</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumBalconies || ""}
                    onChange={(e) => updateField("minimumBalconies", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumBalconies || ""}
                    onChange={(e) => updateField("maximumBalconies", e.target.value)}
                  />
                </div>
              </div>

              {/* Built Year */}
              <div>
                <Label className="mb-3 block text-sm font-medium">Built year</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={form.minimumBuiltYear || ""}
                    onChange={(e) => updateField("minimumBuiltYear", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={form.maximumBuiltYear || ""}
                    onChange={(e) => updateField("maximumBuiltYear", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 flex gap-5">
            <Button className="rounded-lg border border-primary py-5 px-8">
              Save
            </Button>
            <Button
              variant="outline"
              className="rounded-lg py-5 px-8 border-red-400 text-red-500"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}