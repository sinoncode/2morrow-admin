import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { MapPin, Building2, Globe, Landmark } from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"
import {
  MAP_DISPLAY_OPTIONS,
  CONFIDENTIALITY_OPTIONS,
} from "@/types/property.types"

export default function CharacteristicsStep() {
  const { form, updateForm } = usePropertyCreationStore()

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
              <Label>Address Line 1</Label>

              <Input
                placeholder="Enter property address"
                value={form.location?.address_line_1 ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      address_line_1: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Address Line 2</Label>

              <Input
                placeholder="Apartment, suite, unit, etc."
                value={form.location?.address_line_2 ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      address_line_2: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Country / State */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Country</Label>

                <Input
                  placeholder="Switzerland"
                  value={form.location?.country ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>State / Province</Label>

                <Input
                  placeholder="Geneva"
                  value={form.location?.state ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        state: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* City / District / Zip */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>City</Label>

                <Input
                  placeholder="Geneva"
                  value={form.location?.city ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>District</Label>

                <Input
                  placeholder="Eaux-Vives"
                  value={form.location?.district ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        district: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Zip Code</Label>

                <Input
                  placeholder="1200"
                  value={form.location?.zip_code ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        zip_code: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Latitude</Label>

                <Input
                  placeholder="46.2044"
                  value={form.location?.coordinates?.latitude ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        coordinates: {
                          ...form.location?.coordinates,
                          latitude: e.target.value ? Number(e.target.value) : null,
                          longitude: form.location?.coordinates?.longitude ?? null,
                        },
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Longitude</Label>

                <Input
                  placeholder="6.1432"
                  value={form.location?.coordinates?.longitude ?? ""}
                  onChange={(e) =>
                    updateForm({
                      location: {
                        ...form.location,
                        coordinates: {
                          ...form.location?.coordinates,
                          latitude: form.location?.coordinates?.latitude ?? null,
                          longitude: e.target.value ? Number(e.target.value) : null,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Map Display & Confidentiality */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Map Display</Label>

                <Select
                  value={form.location?.map_display ?? "exact_address"}
                  onValueChange={(value) =>
                    updateForm({
                      location: {
                        ...form.location,
                        map_display: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select display" />
                  </SelectTrigger>

                  <SelectContent>
                    {MAP_DISPLAY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Confidentiality</Label>

                <Select
                  value={form.location?.confidentiality_level ?? "public"}
                  onValueChange={(value) =>
                    updateForm({
                      location: {
                        ...form.location,
                        confidentiality_level: value as any,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>

                  <SelectContent>
                    {CONFIDENTIALITY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Neighborhood Description</Label>

              <Textarea
                rows={5}
                placeholder="Describe the surrounding area, accessibility, transportation, schools, hospitals, shopping centers and other important information."
                value={form.location?.neighborhood_description ?? ""}
                onChange={(e) =>
                  updateForm({
                    location: {
                      ...form.location,
                      neighborhood_description: e.target.value,
                    },
                  })
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
    </div>
  )
}