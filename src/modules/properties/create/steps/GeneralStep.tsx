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
import {
  PROPERTY_CATEGORY_OPTIONS,
  PROPERTY_SUB_TYPE_OPTIONS,
  LISTING_TYPE_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
} from "@/types/property.types"
import type { PropertyStatus } from "@/types/property.types"

const statusMetadata: Record<string, { title: string; desc: string }> = {
  draft: { title: "Draft", desc: "Visible only to you" },
  active: { title: "Active", desc: "Publicly listed" },
  sold: { title: "Sold", desc: "Archive from market" },
  inactive: { title: "Inactive", desc: "Temporarily hidden" },
  archived: { title: "Archived", desc: "Permanently archived" },
}

export default function GeneralStep() {
  const { form, updateForm } = usePropertyCreationStore()

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
                updateForm({ title: e.target.value })
              }
              placeholder="The Obsidian Penthouse"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm">
                Category
              </label>

              <Select
                value={form.classification?.category ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      category: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Property Type
              </label>

              <Select
                value={form.classification?.sub_type ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      sub_type: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_SUB_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Listing Type
              </label>

              <Select
                value={form.classification?.transaction_type ?? ""}
                onValueChange={(value) =>
                  updateForm({
                    classification: {
                      ...form.classification,
                      transaction_type: value as any,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select listing" />
                </SelectTrigger>

                <SelectContent>
                  {LISTING_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
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
              value={form.description ?? ""}
              onChange={(e) =>
                updateForm({
                  description: e.target.value,
                })
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
            value={form.classification?.listing_status ?? "draft"}
            onValueChange={(value) =>
              updateForm({
                classification: {
                  ...form.classification,
                  listing_status: value as PropertyStatus,
                },
              })
            }
            className="grid gap-3"
          >
            {(["draft", "active", "sold", "inactive", "archived"] as PropertyStatus[]).map((status) => {
              const meta = statusMetadata[status]

              return (
                <RadioGroupItem key={status} value={status}>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">
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