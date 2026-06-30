import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    Tag,
    Users,
    Trash2,
    X,
    Save,
} from "lucide-react";

import type { AgendaPayload } from "@/types/agenda.types";
import type { AgendaEvent } from "@/types/agenda.types";

import { useAgendaStore } from "@/store/agendaStore";

import type { AgendaUser } from "@/types/agenda.types";

interface EventDialogProps {
    open: boolean;
    event: AgendaEvent | null;
    selectedDate: Date;
    onClose: () => void;
    onSave: (payload: AgendaPayload) => void;
    onDelete: (id: string) => void;
}

const defaultColors = [
    "#60A5FA",
    "#A78BFA",
    "#34D399",
    "#FBBF24",
    "#F87171",
    "#EC4899",
];

const EventDialog = ({
    open,
    event,
    selectedDate,
    onClose,
    onSave,
    onDelete,
}: EventDialogProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const [memberSearch, setMemberSearch] = useState("");

    const [selectedMembers, setSelectedMembers] =
        useState<AgendaUser[]>([]);

    const {
        users,
        searchUsers,
        clearUsers,
    } = useAgendaStore();

    const [color, setColor] = useState(defaultColors[0]);

    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");

    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("10:00");

    const formatDateInput = (date: Date) => {
        return date.toISOString().split("T")[0];
    };

    const resetForm = () => {
        const today = formatDateInput(selectedDate);

        setTitle("");
        setDescription("");
        setLocation("");
        setCategory("");
        setSelectedMembers([]);

        setColor(defaultColors[0]);

        setStartDate(today);
        setEndDate(today);

        setStartTime("09:00");
        setEndTime("10:00");
    };

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (memberSearch.trim().length >= 2) {

                searchUsers(memberSearch);

            } else {

                clearUsers();

            }

        }, 350);

        return () => clearTimeout(timeout);

    }, [memberSearch]);

    useEffect(() => {
        if (!open) return;

        if (!event) {
            resetForm();
            return;
        }

        setTitle(event.title);
        setDescription(event.description || "");

        setLocation(event.location || "");
        setCategory(event.category || "");

        setSelectedMembers(
            event.members || []
        );

        setColor(event.color);

        setStartDate(formatDateInput(event.start));
        setEndDate(formatDateInput(event.end));

        setStartTime(
            event.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        );

        setEndTime(
            event.end.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        );
    }, [event, open]);

    const handleSave = () => {
        if (!title.trim()) {
            return;
        }

        const payload: any = {
            title,
            description,
            start_date: startDate,
            end_date: endDate,
            start_time: startTime,
            end_time: endTime,
            location,
            category,
            members: selectedMembers.map((m) => m.id), // Need a proper user selector for IDs, for now empty array
        };

        onSave(payload);
    };

    const handleDelete = () => {
        if (!event) return;

        onDelete(event.id);
        onClose();
    };
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Dialog */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 40,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="fixed left-1/3 top-5 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-[#141414] shadow-2xl"
                    >

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 p-6">

                            <div>

                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    {event ? "Edit Event" : "Create Event"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Organize your meetings and schedule.
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 transition hover:bg-slate-200 dark:hover:bg-slate-700"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Body */}

                        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">

                            {/* Title */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    <Calendar size={16} />
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Event title"
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Description */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Description
                                </label>

                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write something..."
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Date */}

                            <div className="grid grid-cols-2 gap-5">

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Calendar size={16} />

                                        Start Date

                                    </label>

                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Calendar size={16} />

                                        End Date

                                    </label>

                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                            </div>

                            {/* Time */}

                            <div className="grid grid-cols-2 gap-5">

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Clock size={16} />

                                        Start Time

                                    </label>

                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                                <div>

                                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                        <Clock size={16} />

                                        End Time

                                    </label>

                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                    />

                                </div>

                            </div>

                            {/* Category */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <Tag size={16} />

                                    Category

                                </label>

                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Development"
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Location */}

                            <div>

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <MapPin size={16} />

                                    Location

                                </label>

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Conference Room"
                                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 px-4 py-3 dark:bg-[#1A1A1A] dark:text-white dark:focus:ring-sky-900"
                                />

                            </div>

                            {/* Members */}

                            <div className="relative">

                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                                    <Users size={16} />

                                    Members

                                </label>

                                <input
                                    value={memberSearch}
                                    onChange={(e) => setMemberSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-[#1A1A1A]"
                                />

                                {users.length > 0 && (

                                    <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#202020]">

                                        {users.map((user) => (

                                            <button
                                                key={user.id}
                                                type="button"
                                                onClick={() => {

                                                    if (
                                                        selectedMembers.some(
                                                            (m) => m.id === user.id
                                                        )
                                                    )
                                                        return;

                                                    setSelectedMembers([
                                                        ...selectedMembers,
                                                        user,
                                                    ]);

                                                    setMemberSearch("");

                                                    clearUsers();
                                                }}
                                                className="flex w-full flex-col items-start px-4 py-3 transition hover:bg-sky-50 dark:hover:bg-slate-800"
                                            >

                                                <span className="font-medium">

                                                    {user.name}

                                                </span>

                                                <span className="text-xs text-slate-500">

                                                    {user.email}

                                                </span>

                                            </button>

                                        ))}

                                    </div>

                                )}

                                {selectedMembers.length > 0 && (

                                    <div className="mt-4 flex flex-wrap gap-2">

                                        {selectedMembers.map((member) => (

                                            <div
                                                key={member.id}
                                                className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm"
                                            >

                                                {member.name}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedMembers(
                                                            selectedMembers.filter(
                                                                (m) =>
                                                                    m.id !== member.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <X size={14} />
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>

                            {/* Color Picker */}

                            <div>

                                <label className="mb-3 block text-sm font-semibold">
                                    Event Color
                                </label>

                                <div className="flex gap-4">

                                    {defaultColors.map((item) => (

                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setColor(item)}
                                            className={`h-10 w-10 rounded-full border-4 transition ${color === item
                                                ? "border-slate-700 scale-110"
                                                : "border-transparent"
                                                }`}
                                            style={{
                                                backgroundColor: item,
                                            }}
                                        />

                                    ))}

                                </div>

                            </div>
                        </div>

                        {/* Footer */}

                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#1A1A1A] px-6 py-5 rounded-b-3xl">

                            {/* Delete Button */}

                            <div>

                                {event && (

                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>

                                )}

                            </div>

                            {/* Action Buttons */}

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={onClose}
                                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] px-5 py-2.5 font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleSave();
                                        onClose();
                                    }}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <Save size={18} />
                                    {event ? "Update Event" : "Save Event"}
                                </button>

                            </div>

                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EventDialog;