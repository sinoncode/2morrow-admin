import { CalendarIcon, Globe, ShieldCheck, Star } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { usePropertyCreationStore } from "../store/propertyCreationStore"

export default function PublicationStep() {
  const { form, updateField } = usePropertyCreationStore()

  return (
    <div className="space-y-6">
      {/* Publication Status */}

      <Card>
        <CardHeader>
          <CardTitle>
            Publication Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Property Status</Label>

            <Select
              value={form.publicationStatus}
              onValueChange={(value) =>
                updateField("publicationStatus", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="draft">
                  Draft
                </SelectItem>

                <SelectItem value="active">
                  Active
                </SelectItem>

                <SelectItem value="sold">
                  Sold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>

            <Select
              value={form.visibility}
              onValueChange={(value) =>
                updateField("visibility", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Visibility" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="public">
                  Public
                </SelectItem>

                <SelectItem value="private">
                  Private
                </SelectItem>

                <SelectItem value="agents-only">
                  Agents Only
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Property */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Featured Listing
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Highlight this property
            </p>

            <p className="text-sm text-muted-foreground">
              Featured listings appear first in search results.
            </p>
          </div>

          <Switch
            checked={form.isFeatured}
            onCheckedChange={(value) =>
              updateField("isFeatured", value)
            }
          />
        </CardContent>
      </Card>

      {/* Listing Priority */}

      <Card>
        <CardHeader>
          <CardTitle>
            Listing Priority
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            value={form.priority}
            onValueChange={(value) =>
              updateField("priority", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="low">
                Low
              </SelectItem>

              <SelectItem value="normal">
                Normal
              </SelectItem>

              <SelectItem value="high">
                High
              </SelectItem>

              <SelectItem value="premium">
                Premium
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Agent Assignment */}

      <Card>
        <CardHeader>
          <CardTitle>
            Agent Assignment
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            value={form.assignedAgent}
            onValueChange={(value) =>
              updateField("assignedAgent", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="john-smith">
                John Smith
              </SelectItem>

              <SelectItem value="sarah-jones">
                Sarah Jones
              </SelectItem>

              <SelectItem value="michael-lee">
                Michael Lee
              </SelectItem>

              <SelectItem value="emma-wilson">
                Emma Wilson
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Publish Dates */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Publication Schedule
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Publish Date</Label>

            <Input
              type="date"
              value={form.publishDate}
              onChange={(e) =>
                updateField(
                  "publishDate",
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>

            <Input
              type="date"
              value={form.expiryDate}
              onChange={(e) =>
                updateField(
                  "expiryDate",
                  e.target.value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Verification */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verification
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              Verified Listing
            </Label>

            <Switch
              checked={form.isVerified}
              onCheckedChange={(value) =>
                updateField("isVerified", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>
              Requires Approval
            </Label>

            <Switch
              checked={form.requiresApproval}
              onCheckedChange={(value) =>
                updateField(
                  "requiresApproval",
                  value
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            SEO & Search Visibility
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>SEO Title</Label>

            <Input
              value={form.seoTitle}
              onChange={(e) =>
                updateField(
                  "seoTitle",
                  e.target.value
                )
              }
              placeholder="Luxury Villa For Sale In Palm Jumeirah"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>

            <Textarea
              rows={4}
              value={form.metaDescription}
              onChange={(e) =>
                updateField(
                  "metaDescription",
                  e.target.value
                )
              }
              placeholder="SEO description for search engines..."
            />
          </div>

          <div className="space-y-2">
            <Label>SEO Keywords</Label>

            <Input
              value={form.seoKeywords}
              onChange={(e) =>
                updateField(
                  "seoKeywords",
                  e.target.value
                )
              }
              placeholder="villa, dubai, luxury property, beachfront"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}