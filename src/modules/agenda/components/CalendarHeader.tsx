import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
} from "lucide-react";

interface CalendarHeaderProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    activeView: string;
    onViewChange: (view: string) => void;
}

const views = ["Month", "Week", "Day"];

const CalendarHeader = ({
    selectedDate,
    onDateChange,
    activeView,
    onViewChange,
}: CalendarHeaderProps) => {

    const previousMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() - 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() - 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() - 1);
        }
        onDateChange(date);
    };

    const nextMonth = () => {
        const date = new Date(selectedDate);
        if (activeView === "Month") {
            date.setMonth(date.getMonth() + 1);
        } else if (activeView === "Week") {
            date.setDate(date.getDate() + 7);
        } else if (activeView === "Day") {
            date.setDate(date.getDate() + 1);
        }
        onDateChange(date);
    };

    const goToToday = () => {
        onDateChange(new Date());
    };

    return (
        <div className="flex flex-col gap-6 border-b border-slate-100 dark:border-slate-800/50 p-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div className="flex items-center gap-5">

                <button
                    onClick={previousMonth}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 transition hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <ChevronLeft size={18} />
                </button>

                <button
                    onClick={nextMonth}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 transition hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <ChevronRight size={18} />
                </button>

                <div>

                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                        {selectedDate.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </p>

                </div>

            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-3">

                <button
                    onClick={goToToday}
                    className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold shadow-lg transition hover:scale-105"
                >
                    <CalendarDays size={18} />
                    Today
                </button>

                <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1">

                    {views.map((view) => (
                        <button
                            key={view}
                            onClick={() => onViewChange(view)}
                            className="relative px-6 py-2 text-sm font-semibold"
                        >
                            {activeView === view && (
                                <motion.div
                                    layoutId="calendar-view"
                                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#141414] shadow"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <span
                                className={`relative z-10 ${activeView === view
                                    ? "text-slate-800 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400"
                                    }`}
                            >
                                {view}
                            </span>
                        </button>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default CalendarHeader;