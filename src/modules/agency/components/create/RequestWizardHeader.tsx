import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowLeft, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

interface RequestWizardHeaderProps {
  title?: string
  description?: string
  actionLabel?: string
  onSave: () => void
  isSubmitting: boolean
  onCancel: () => void
  mode?: "create" | "edit"
  agencyId?: string | number
}

export default function RequestWizardHeader({
  title = "Create Agency Profile",
  description = "Onboard a new real estate agency partner into the 2morrow ecosystem.",
  actionLabel = "Save Agency",
  onSave,
  isSubmitting,
  onCancel,
  mode = "create",
  agencyId,
}: RequestWizardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-2">
      <div className="flex items-start gap-3">
        <Link to="/agency/list">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl mt-0.5">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <Badge
              variant="outline"
              className={
                mode === "edit"
                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 font-semibold"
                  : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 font-semibold"
              }
            >
              {mode === "edit" ? `Edit #${agencyId || ""}` : "Create Mode"}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end md:self-auto">
        <Button variant="outline" onClick={onCancel} className="rounded-xl h-10 px-5">
          Cancel
        </Button>

        <Button
          onClick={onSave}
          disabled={isSubmitting}
          className="rounded-xl h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin" />
              Saving...
            </span>
          ) : (
            actionLabel
          )}
        </Button>
      </div>
    </div>
  )
}