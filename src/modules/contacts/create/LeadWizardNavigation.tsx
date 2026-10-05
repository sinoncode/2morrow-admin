import { cn } from "@/lib/utils"
import {
  UserCheck,
  Wallet,
  Building2,
  Home,
  History,
  Network,
} from "lucide-react"

interface Props {
  steps: string[]
  currentStep: number
  onStepChange: (step: number) => void
}

const getStepIcon = (index: number) => {
  const icons = [
    UserCheck,
    Wallet,
    Building2,
    Home,
    History,
    Network,
  ]

  const Icon = icons[index] || Building2

  return <Icon className="h-4 w-4 shrink-0" />
}

export default function LeadWizardNavigation({
  steps,
  currentStep,
  onStepChange,
}: Props) {
  return (
    /* ONLY THIS AREA CAN SCROLL */
    <div className="w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">   
      {/* Content is allowed to be wider than the screen */}
      <div
        className="
          flex
          w-[80%]
          min-w-full
          items-center
          justify-start
          gap-1
          rounded-full
          bg-[linear-gradient(90deg,_#1f6ea9_0%,_#155789_40%,_#0a2f4f_70%,_#040404_100%)]
          p-1.5
          shadow-md
        "
      >
        {steps.map((step, index) => {
          const isActive = currentStep === index

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
                shrink-0
                items-center
                gap-2
                rounded-full
                px-5
                py-2.5
                font-medium
                transition-all
                duration-300
                ease-out
                text-base
                whitespace-nowrap
                `,
                isActive
                  ? "bg-white text-slate-900 shadow-sm scale-[1.02]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  isActive
                    ? "text-slate-900"
                    : "text-white/80 group-hover:text-white"
                )}
              >
                {getStepIcon(index)}
              </span>

              <span>{step}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}