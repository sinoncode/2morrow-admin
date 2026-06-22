import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Sparkles,
} from "lucide-react";

import CalendarSidebar from "../components/CalendarSidebar";
import CalendarHeader from "../components/CalendarHeader";
import CalendarBoard from "../components/CalendarBoard";
import EventDialog from "../components/EventDialog";
import CategoryProgress from "../components/CategoryProgress";
import UpcomingMeeting from "../components/UpcomingMeeting";

export interface AgendaEvent {
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    color: string;
    members?: string[];
    location?: string;
    category?: string;
}

const initialEvents: AgendaEvent[] = [
    {
        id: crypto.randomUUID(),
        title: "Booking Taxi App",
        description: "Review dashboard UI with team",
        start: new Date(2026, 0, 12, 6, 0),
        end: new Date(2026, 0, 12, 7, 30),
        color: "#A5C8F8",
        category: "Design",
        location: "Meeting Room A",
        members: [
            "Antonio",
            "Sophia",
            "Lucas",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Design Onboarding",
        description: "New designer introduction",
        start: new Date(2026, 0, 12, 6, 0),
        end: new Date(2026, 0, 12, 7, 10),
        color: "#A8E6B3",
        category: "Training",
        location: "Studio",
        members: [
            "Emma",
            "Daniel",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Development Meeting",
        description: "Sprint Planning",
        start: new Date(2026, 0, 12, 8, 0),
        end: new Date(2026, 0, 12, 9, 0),
        color: "#BCA6F6",
        category: "Development",
        location: "Zoom",
        members: [
            "Oliver",
            "James",
            "Sophia",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Design Session",
        description: "Landing page redesign",
        start: new Date(2026, 0, 12, 8, 0),
        end: new Date(2026, 0, 12, 10, 0),
        color: "#F7D37B",
        category: "Design",
        location: "Creative Room",
        members: [
            "Ava",
            "Noah",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Design Review",
        description: "Component review",
        start: new Date(2026, 0, 12, 10, 0),
        end: new Date(2026, 0, 12, 10, 45),
        color: "#A9CCF7",
        category: "Meeting",
        location: "Office",
        members: [
            "Emily",
            "Liam",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "New Project",
        description: "Kickoff Meeting",
        start: new Date(2026, 0, 12, 11, 0),
        end: new Date(2026, 0, 12, 12, 30),
        color: "#9FC4EF",
        category: "Business",
        location: "Conference Hall",
        members: [
            "Antonio",
            "Sophia",
            "Lucas",
            "Emma",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Client Presentation",
        description: "Quarterly Review",
        start: new Date(2026, 0, 13, 9, 30),
        end: new Date(2026, 0, 13, 10, 30),
        color: "#F8B6D5",
        category: "Meeting",
        location: "Client Office",
        members: [
            "Daniel",
            "Lucas",
        ],
    },
    {
        id: crypto.randomUUID(),
        title: "Product Strategy",
        description: "Roadmap Planning",
        start: new Date(2026, 0, 15, 13, 0),
        end: new Date(2026, 0, 15, 15, 0),
        color: "#8CE4D4",
        category: "Business",
        location: "Board Room",
        members: [
            "Oliver",
            "James",
            "Emily",
        ],
    },
];

const Agenda = () => {
    const [events, setEvents] =
        useState<AgendaEvent[]>(initialEvents);

    const [selectedDate, setSelectedDate] =
        useState(new Date(2026, 0, 12));

    const [activeView, setActiveView] =
        useState("Month");

    const [search, setSearch] =
        useState("");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedEvent, setSelectedEvent] =
        useState<AgendaEvent | null>(null);

    const filteredEvents = useMemo(() => {
        if (!search.trim()) return events;

        return events.filter((event) =>
            event.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [events, search]);

    const openCreateDialog = () => {
        setSelectedEvent(null);
        setDialogOpen(true);
    };

    const openEditDialog = (
        event: AgendaEvent
    ) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
    };

    const saveEvent = (
        event: AgendaEvent
    ) => {
        const exists = events.find(
            (e) => e.id === event.id
        );

        if (exists) {
            setEvents((prev) =>
                prev.map((e) =>
                    e.id === event.id ? event : e
                )
            );
        } else {
            setEvents((prev) => [
                ...prev,
                {
                    ...event,
                    id: crypto.randomUUID(),
                },
            ]);
        }

        closeDialog();
    };

    const deleteEvent = (id: string) => {
        setEvents((prev) =>
            prev.filter((e) => e.id !== id)
        );
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="min-h-screen bg-[#ECECEC] dark:bg-[#0A0A0A] p-4 lg:p-8 dark:[color-scheme:dark]"
            >
                <div className="mx-auto h-[95vh] max-w-[1850px] overflow-hidden rounded-[42px] bg-white dark:bg-[#141414] shadow-[0_35px_80px_rgba(0,0,0,0.18)]">

                    <div className="flex h-full">

                        {/* ================= Sidebar ================= */}

                        <aside className="hidden w-[360px] shrink-0 bg-[linear-gradient(180deg,#1f6ea9_0%,#155789_40%,#0a2f4f_70%,#040404_100%)] p-7 text-white xl:flex xl:flex-col overflow-x-scroll">

                            <CalendarSidebar
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                                events={filteredEvents}
                            />

                        </aside>

                        {/* ================= Main ================= */}

                        <div className="flex min-w-0 flex-1 flex-col bg-[#F7F7F7] dark:bg-[#1A1A1A]">

                            {/* ================= Top Toolbar ================= */}

                            <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] px-8 py-6">

                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                    {/* Left */}

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#1f6ea9_0%,#155789_40%,#0a2f4f_70%,#040404_100%)] text-white shadow-lg">

                                                <Sparkles size={22} />

                                            </div>

                                            <div>

                                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                    Agenda
                                                </h1>

                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                    Organize meetings, schedules and projects
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <div className="flex flex-wrap items-center gap-4">

                                        {/* Search */}

                                        <div className="relative">

                                            <Search
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                                            />

                                            <input
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                placeholder="Search events..."
                                                className="h-12 w-[300px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1A1A1A] pl-12 pr-5 text-sm outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white dark:bg-[#141414] focus:ring-4 focus:ring-indigo-100 dark:text-white dark:bg-[#1A1A1A]"
                                            />

                                        </div>

                                        {/* Add Button */}

                                        <button
                                            onClick={openCreateDialog}
                                            className="flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                                        >

                                            <Plus size={18} />

                                            New Event

                                        </button>

                                    </div>

                                </div>

                            </div>

                            {/* ================= Calendar Section ================= */}

                            <div className="flex flex-1 overflow-hidden">

                                {/* ================= Left Dashboard ================= */}

                                {/* <aside className="hidden w-[360px] shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] p-6 2xl:block">

                                    <div className="flex h-full flex-col gap-6">


                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45 }}
                                            className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-xl"
                                        >
                                            <p className="text-sm font-medium text-indigo-100">
                                                Productivity
                                            </p>

                                            <h2 className="mt-2 text-4xl font-bold">
                                                86%
                                            </h2>

                                            <p className="mt-2 text-sm text-indigo-100">
                                                You completed most of this week's
                                                scheduled meetings.
                                            </p>

                                            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white dark:bg-[#141414]/20">
                                                <div className="h-full w-[86%] rounded-full bg-white dark:bg-[#141414]" />
                                            </div>
                                        </motion.div>


                                        <motion.div
                                            initial={{ opacity: 0, y: 25 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 }}
                                            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] p-6 shadow-sm"
                                        >
                                            <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                                                Category Progress
                                            </h3>

                                            <CategoryProgress
                                                events={filteredEvents}
                                            />
                                        </motion.div>


                                        <motion.div
                                            initial={{ opacity: 0, y: 25 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] p-6 shadow-sm"
                                        >
                                            <div className="mb-5 flex items-center justify-between">

                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    Upcoming Meetings
                                                </h3>

                                                <button className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-700">
                                                    View All
                                                </button>

                                            </div>

                                            <UpcomingMeeting
                                                events={filteredEvents}
                                                onSelect={openEditDialog}
                                            />
                                        </motion.div>


                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] p-6 shadow-sm"
                                        >
                                            <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
                                                Quick Stats
                                            </h3>

                                            <div className="space-y-4">

                                                <div className="flex items-center justify-between">

                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Total Events
                                                    </span>

                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {filteredEvents.length}
                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Today's Events
                                                    </span>

                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {
                                                            filteredEvents.filter(
                                                                (event) =>
                                                                    event.start.toDateString() ===
                                                                    selectedDate.toDateString()
                                                            ).length
                                                        }
                                                    </span>

                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Categories
                                                    </span>

                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {
                                                            new Set(
                                                                filteredEvents.map(
                                                                    (event) =>
                                                                        event.category
                                                                )
                                                            ).size
                                                        }
                                                    </span>

                                                </div>

                                            </div>
                                        </motion.div>

                                    </div>

                                </aside> */}

                                <div className="flex min-w-0 flex-1 flex-col">

                                    {/* Calendar Header */}

                                    <div className="bg-white dark:bg-[#141414]">

                                        <CalendarHeader
                                            selectedDate={selectedDate}
                                            onDateChange={setSelectedDate}
                                            activeView={activeView}
                                            onViewChange={setActiveView}
                                        />

                                    </div>

                                    {/* Calendar */}

                                    <div className="flex-1 overflow-auto bg-[#F8F8F8] dark:bg-[#1A1A1A]">

                                        <CalendarBoard
                                            events={filteredEvents}
                                            selectedDate={selectedDate}
                                            onEventClick={openEditDialog}
                                            onCreateEvent={openCreateDialog}
                                            activeView={activeView}
                                        />

                                    </div>

                                </div>



                            </div>

                        </div>

                    </div>

                </div>

            </motion.div>
            <EventDialog
                open={dialogOpen}
                event={selectedEvent}
                selectedDate={selectedDate}
                onClose={closeDialog}
                onSave={saveEvent}
                onDelete={deleteEvent}
            />
        </>
    );
};

export default Agenda;