import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { MapPin, Building2, Globe, Landmark } from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

export default function CharacteristicsStep() {
  const { form, updateField } = usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Address + Coordinates */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left Side */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Property Location
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Street Address */}
            <div className="space-y-2">
              <Label>Street Address</Label>

              <Input
                placeholder="Enter property address"
                value={form.address}
                onChange={(e) =>
                  updateField("address", e.target.value)
                }
              />
            </div>

            {/* Country / State */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Country</Label>

                <Input
                  placeholder="United Arab Emirates"
                  value={form.country || ""}
                  onChange={(e) =>
                    updateField("country", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>State / Province</Label>

                <Input
                  placeholder="Dubai"
                  value={form.state}
                  onChange={(e) =>
                    updateField("state", e.target.value)
                  }
                />
              </div>
            </div>

            {/* City / Zip */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>City</Label>

                <Input
                  placeholder="Dubai Marina"
                  value={form.city}
                  onChange={(e) =>
                    updateField("city", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Zip Code</Label>

                <Input
                  placeholder="00000"
                  value={form.zipCode}
                  onChange={(e) =>
                    updateField("zipCode", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Latitude</Label>

                <Input
                  placeholder="25.2048"
                  value={form.latitude}
                  onChange={(e) =>
                    updateField("latitude", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Longitude</Label>

                <Input
                  placeholder="55.2708"
                  value={form.longitude}
                  onChange={(e) =>
                    updateField("longitude", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location Description</Label>

              <Textarea
                rows={5}
                placeholder="Describe the surrounding area, accessibility, transportation, schools, hospitals, shopping centers and other important information."
                value={form.locationDescription || ""}
                onChange={(e) =>
                  updateField(
                    "locationDescription",
                    e.target.value
                  )
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Map Preview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed bg-muted/30">
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-10 w-10 text-primary" />

                <h3 className="font-medium">
                  Map Integration
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Google Maps / Leaflet Map
                  will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Community Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Community</Label>

            <Input
              placeholder="Palm Jumeirah"
              value={form.community || ""}
              onChange={(e) =>
                updateField("community", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Sub Community</Label>

            <Input
              placeholder="Shoreline Apartments"
              value={form.subCommunity || ""}
              onChange={(e) =>
                updateField(
                  "subCommunity",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Building Name</Label>

            <Input
              placeholder="Marina Gate Tower"
              value={form.buildingName || ""}
              onChange={(e) =>
                updateField(
                  "buildingName",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            Nearby Landmarks
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <Label>School Distance</Label>

              <Input placeholder="2 km" />
            </div>

            <div className="space-y-2">
              <Label>Hospital Distance</Label>

              <Input placeholder="1.5 km" />
            </div>

            <div className="space-y-2">
              <Label>Mall Distance</Label>

              <Input placeholder="500 m" />
            </div>

            <div className="space-y-2">
              <Label>Metro Distance</Label>

              <Input placeholder="800 m" />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Nearby Places Description</Label>

            <Textarea
              rows={4}
              placeholder="Mention schools, hospitals, shopping malls, metro stations, parks, beaches and other nearby facilities."
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Location Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Additional Location Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nearest Airport</Label>

            <Input placeholder="Dubai International Airport" />
          </div>

          <div className="space-y-2">
            <Label>Travel Time</Label>

            <Input placeholder="15 Minutes" />
          </div>

          <div className="space-y-2">
            <Label>Nearest Public Transport</Label>

            <Input placeholder="Dubai Marina Metro Station" />
          </div>

          <div className="space-y-2">
            <Label>Accessibility Score</Label>

            <Input placeholder="Excellent" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}