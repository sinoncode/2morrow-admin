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
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm">
              Property Title
            </label>

            <Input
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="The Obsidian Penthouse"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm">
                Property Type
              </label>

              <Select
                onValueChange={(value) =>
                  updateField(
                    "propertyType",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="apartment">
                    Apartment
                  </SelectItem>

                  <SelectItem value="villa">
                    Villa
                  </SelectItem>

                  <SelectItem value="penthouse">
                    Penthouse
                  </SelectItem>

                  <SelectItem value="office">
                    Office
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Listing Type
              </label>

              <Select
                onValueChange={(value) =>
                  updateField(
                    "listingType",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select listing" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="sale">
                    Sale
                  </SelectItem>

                  <SelectItem value="rent">
                    Rent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Detailed Description
            </label>

            <Textarea
              rows={8}
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

      <Card>
        <CardContent className="space-y-5 p-6">
          <h3 className="font-medium">
            Publication Status
          </h3>

          <RadioGroup
            value={form.publicationStatus}
            onValueChange={(value) => updateField("publicationStatus", value)}
            className="grid gap-3"
          >
            {["draft", "active", "sold"].map((status) => {
              const meta = statusMetadata[status as keyof typeof statusMetadata]
              
              return (
                <RadioGroupItem key={status} value={status}>
                  <span className="text-sm font-semibold text-slate-800">
                    {meta.title}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {meta.desc}
                  </span>
                </RadioGroupItem>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}