import { cn } from "@/lib/utils"
import {
  Building2,
  MapPin,
  FileText,
  Key,
  Handshake,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react"

interface Props {
  steps: string[]
  currentStep: number
  onStepChange: (step: number) => void
  completedSteps?: number[]
}

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Company Identity": Building2,
  "Address & Contact": MapPin,
  "Partnership": FileText,
  "CRM Portal Access": Key,
  "Activity & Performance": Handshake,
  "Calls": Phone,
  "Mails": Mail,
}

export default function RequestWizardNavigation({
  steps,
  currentStep,
  onStepChange,
  completedSteps = [],
}: Props) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div
        className="
          flex min-w-fit justify-start items-center gap-1.5
          rounded-2xl
          bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md
          p-1.5
          shadow-lg shadow-slate-950/10 border border-slate-800/80
        "
      >
        {steps.map((step, index) => {
          const isActive = currentStep === index
          const isCompleted = completedSteps.includes(index)
          const IconComponent = STEP_ICONS[step] || Building2

          return (
            <button
              key={step}
              type="button"
              onClick={() => onStepChange(index)}
              className={cn(
                `
                group
                relative
                flex
                items-center
                gap-2.5
                rounded-xl
                px-4
                py-2.5
                font-medium
                transition-all
                duration-300
                ease-out
                text-xs sm:text-sm
                whitespace-nowrap
                `,
                isActive
                  ? "bg-white text-slate-900 shadow-md scale-[1.02] font-semibold dark:bg-slate-100 dark:text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center transition-colors duration-300",
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-white"
                )}
              >
                {isCompleted && !isActive ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <IconComponent className="h-4 w-4 shrink-0" />
                )}
              </span>

              <span>{step}</span>

              <span
                className={cn(
                  "ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold",
                  isActive
                    ? "bg-slate-200/80 text-slate-800"
                    : "bg-white/10 text-slate-400"
                )}
              >
                0{index + 1}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}