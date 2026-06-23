import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Textarea } from "@/components/ui/textarea"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

const statusMetadata = {
  draft: { title: "Draft", desc: "Visible only to you" },
  active: { title: "Active", desc: "Publicly listed" },
  sold: { title: "Sold", desc: "Archive from market" },
}

export default function GeneralStep() {
  const { form, updateField } =
    usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* GENERAL INFORMATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Localisation
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Agent */}
            <div>
              <label className="mb-2 block text-sm">
                Agent
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="edyta">
                    Edyta Graf
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm">
                Category
              </label>

              <Select
                value={form.propertyType}
                onValueChange={(value) =>
                  updateField("propertyType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="home">
                    Home
                  </SelectItem>

                  <SelectItem value="apartment">
                    Apartment
                  </SelectItem>

                  <SelectItem value="villa">
                    Villa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm">
                Status
              </label>

              <Select
                value={form.publicationStatus}
                onValueChange={(value) =>
                  updateField(
                    "publicationStatus",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">
                    Active
                  </SelectItem>

                  <SelectItem value="draft">
                    Draft
                  </SelectItem>

                  <SelectItem value="sold">
                    Sold
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact */}
            <div>
              <label className="mb-2 block text-sm">
                Contact
              </label>

              <Input placeholder="Manuel" />
            </div>

            {/* Source */}
            <div>
              <label className="mb-2 block text-sm">
                Source
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="homegate">
                    Homegate.ch
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Proprietary Source */}
            <div>
              <label className="mb-2 block text-sm">
                Proprietary source
              </label>

              <Input />
            </div>
          </div>

          {/* Transaction */}
          <div className="mt-5">
            <label className="mb-2 block text-sm">
              Transaction
            </label>

            <RadioGroup
              value={form.listingType}
              onValueChange={(value) =>
                updateField("listingType", value)
              }
              className="flex gap-3"
            >
              <label className="flex items-center gap-2 rounded-lg border px-6 py-3 cursor-pointer">
                <RadioGroupItem value="sale" />
                Sale
              </label>

              <label className="flex items-center gap-2 rounded-lg border px-6 py-3 cursor-pointer">
                <RadioGroupItem value="rent" />
                Rent
              </label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* LOCALIZATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Localisation
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm">
                City
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Switzerland" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="switzerland">
                    Switzerland
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Radius
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="2800 Delemont" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="2800">
                    2800 Delemont
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BUDGET */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Budget
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm">
                Price
              </label>

              <Input placeholder="1.791.000" />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Currency
              </label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="CHF" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="chf">
                    CHF
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Commission (%)
              </label>

              <Input placeholder="Agent" />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Commission
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Contract Number
              </label>

              <Input placeholder="+41 8076774587" />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Date of Signature
              </label>

              <Input type="date" />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Expiration Date
              </label>

              <Input type="date" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm">
              Private Notes
            </label>

            <Textarea
              rows={5}
              placeholder="Bonjour, Ce bien m'intéresse..."
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button className="rounded-lg bg-primary px-8 py-2">
              Save
            </button>

            <button className="rounded-lg border px-8 py-2 text-red-500">
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}