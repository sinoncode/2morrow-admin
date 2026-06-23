import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import {
  Home,
  Trees,
  Building2,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

const indoorAmenities = [
  "Air Conditioning",
  "Fireplace",
  "Walk-In Closet",
  "Study Room",
  "Maid Room",
  "Storage Room",
  "Laundry Room",
  "Private Office",
  "Home Theater",
  "Wine Cellar",
]

const outdoorAmenities = [
  "Private Pool",
  "Garden",
  "Terrace",
  "Balcony",
  "BBQ Area",
  "Outdoor Kitchen",
  "Kids Play Area",
  "Private Gym",
  "Jogging Track",
]

const buildingAmenities = [
  "Concierge",
  "24/7 Security",
  "CCTV",
  "Lobby",
  "Gym",
  "Spa",
  "Sauna",
  "Steam Room",
  "Business Center",
  "Conference Room",
]

const smartFeatures = [
  "Smart Lighting",
  "Smart Locks",
  "Smart Thermostat",
  "Biometric Access",
  "EV Charging",
  "Solar Panels",
  "Smart Security",
  "Remote Access",
]

function AmenitySection({
  title,
  icon,
  amenities,
}: {
  title: string
  icon: React.ReactNode
  amenities: string[]
}) {
  const { form, updateField } = usePropertyCreationStore()

  const toggleAmenity = (amenity: string) => {
    const exists = form.amenities.includes(amenity)

    if (exists) {
      updateField(
        "amenities",
        form.amenities.filter((a) => a !== amenity)
      )
    } else {
      updateField("amenities", [
        ...form.amenities,
        amenity,
      ])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => {
            const selected =
              form.amenities.includes(amenity)

            return (
              <Badge
                key={amenity}
                onClick={() =>
                  toggleAmenity(amenity)
                }
                variant={
                  selected ? "default" : "outline"
                }
                className={`
                  cursor-pointer
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  transition-all
                  duration-200
                  hover:scale-105
                `}
              >
                {amenity}
              </Badge>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DescriptionStep() {
  const { form, updateField } =
    usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Property Description */}

      <Card>
        <CardHeader>
          <CardTitle>
            Property Description
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <Label>
              Detailed Property Description
            </Label>

            <Textarea
              rows={8}
              placeholder="Describe the property, location, lifestyle benefits, views, nearby attractions and investment potential..."
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Highlights */}

      <Card>
        <CardHeader>
          <CardTitle>
            Property Highlights
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Textarea
            rows={4}
            placeholder="Luxury Sea View, Walking Distance To Metro, Premium Finishes, Smart Home Enabled..."
          />
        </CardContent>
      </Card>

      {/* Amenities */}

      <div className="grid gap-6 xl:grid-cols-2">
        <AmenitySection
          title="Indoor Amenities"
          icon={
            <Home className="h-5 w-5 text-primary" />
          }
          amenities={indoorAmenities}
        />

        <AmenitySection
          title="Outdoor Amenities"
          icon={
            <Trees className="h-5 w-5 text-primary" />
          }
          amenities={outdoorAmenities}
        />

        <AmenitySection
          title="Building Amenities"
          icon={
            <Building2 className="h-5 w-5 text-primary" />
          }
          amenities={buildingAmenities}
        />

        <AmenitySection
          title="Smart Features"
          icon={
            <Sparkles className="h-5 w-5 text-primary" />
          }
          amenities={smartFeatures}
        />
      </div>

      {/* Luxury Features */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Premium & Luxury Features
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Private Elevator",
              "Infinity Pool",
              "Private Beach Access",
              "Penthouse Level",
              "Sky Lounge",
              "Golf Course View",
              "Marina View",
              "Burj Khalifa View",
            ].map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="
                  justify-center
                  py-3
                  cursor-pointer
                  hover:bg-primary
                  hover:text-primary-foreground
                  transition-all
                "
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Keywords */}

      <Card>
        <CardHeader>
          <CardTitle>
            SEO Keywords & Tags
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Textarea
            rows={3}
            placeholder="Luxury Villa, Dubai Marina, Sea View Apartment, Smart Home..."
          />
        </CardContent>
      </Card>
    </div>
  )
}