"use client";

import React from "react";
import Select, {type ActionMeta, type MultiValue, type SingleValue, type StylesConfig} from "react-select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {X} from "lucide-react";

type Option = { label: string; value: string };

export interface FilterOptions {
    projectCategories: { name: string }[];
    projectStatuses: { name: string }[];
    projectSkills: { name: string, importance: number }[];
}

interface Props {
    initialQuery: string;
    initialCategory: string;
    initialStatus: string;
    initialStacks: string[];
    filterOptions: FilterOptions;
}

export default function ProjectsFilters({
                                            initialQuery,
                                            initialCategory,
                                            initialStatus,
                                            initialStacks,
                                            filterOptions,
                                        }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const catOptions: Option[] = filterOptions.projectCategories.map((c) => ({label: c.name, value: c.name}));
    const statusOptions: Option[] = filterOptions.projectStatuses.map((s) => ({label: s.name, value: s.name}));
    const skillOptions: Option[] = filterOptions.projectSkills.map((t) => ({label: t.name, value: t.name}));

    const [query, setQuery] = React.useState(initialQuery);
    const [category, setCategory] = React.useState<Option | null>(initialCategory ? {
        label: initialCategory,
        value: initialCategory
    } : null);
    const [status, setStatus] = React.useState<Option | null>(initialStatus ? {
        label: initialStatus,
        value: initialStatus
    } : null);
    const [stacks, setStacks] = React.useState<Option[]>(initialStacks.map((s) => ({label: s, value: s})));

    const urlSearchParams = useSearchParams();

    React.useEffect(() => {
        const t = setTimeout(() => {
            const params = new URLSearchParams(urlSearchParams.toString()); // ✅ сохраняем projectId

            // сначала чистим только фильтровые ключи (чтобы удалялись когда пусто)
            params.delete("q");
            params.delete("category");
            params.delete("status");
            params.delete("stacks");

            if (query) params.set("q", query);
            if (category?.value) params.set("category", category.value);
            if (status?.value) params.set("status", status.value);
            if (stacks.length) params.set("stacks", stacks.map(s => s.value).join(","));

            const qs = params.toString();
            router.replace(qs ? `${pathname}?${qs}` : pathname, {scroll: false}); // replace лучше чем push
        }, 400);

        return () => clearTimeout(t);
    }, [query, category, status, stacks, pathname, router, urlSearchParams]);

    const onCategory = (v: SingleValue<Option>) => {
        setCategory(v ?? null);
    };
    const onStatus = (v: SingleValue<Option>) => {
        setStatus(v ?? null);
    };

    const onStacks = (
        newValue: MultiValue<Option>,
        meta: ActionMeta<Option>
    ) => {
        if (meta.action === "select-option") {
            const option = meta.option;
            if (!option) return; // на всякий случай защита

            setStacks(prev => [
                {label: option.label, value: option.value},
                ...prev.filter(o => o.value !== option.value),
            ]);
            return;
        }

        if (
            meta.action === "remove-value" ||
            meta.action === "pop-value" ||
            meta.action === "clear"
        ) {
            setStacks(newValue as Option[]);
            return;
        }

        setStacks(newValue as Option[]);
    };

    const clearAll = () => {
        setQuery("");
        setCategory(null);
        setStatus(null);
        setStacks([]);
        router.push(pathname, {scroll: false});
    };

    return (
        <div className="w-full flex items-center justify-center gap-6">
            {/* Category */}
            <div className="flex items-center gap-4.5">
                <p className="text-gold-primary font-taviraj text-base ">Category</p>
                <Select<Option, false>
                    instanceId="proj-cat"
                    options={catOptions}
                    value={category}
                    onChange={onCategory}
                    placeholder="Category"
                    isClearable
                    className="w-[170px] z-40 font-lato text-3xs "
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Tech stacks (multi) */}
            <div className="flex items-center gap-4.5">
                <p className="text-gold-primary font-taviraj text-base ">Tech Stacks</p>
                <Select<Option, true>
                    instanceId="proj-stacks"
                    options={skillOptions}
                    value={stacks}
                    onChange={onStacks}
                    placeholder="Tech stacks"
                    isSearchable={false}
                    isMulti
                    className="w-[250px] max-h-9.5 z-40 font-lato text-3xs"
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Status */}
            <div className="flex items-center gap-4.5 max-laptop:hidden">
                <p className="text-gold-primary font-taviraj text-base ">Status</p>
                <Select<Option, false>
                    instanceId="proj-status"
                    options={statusOptions}
                    value={status}
                    onChange={onStatus}
                    placeholder="Status"
                    isClearable
                    className="w-[180px] z-40 font-lato text-3xs"
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Search */}
            <div className="w-50 max-desk:hidden">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="w-full h-10 font-lato text-3xs rounded-[2px] bg-black-primary text-white placeholder-[rgba(255,255,255,0.4)] px-3 outline-none border border-black-100  focus:border-gold-primary transition"
                />
            </div>

            {/* Reset */}
            <button
                onClick={clearAll}
                className="h-[38px] w-[38px] flex items-center justify-center text-gold-primary cursor-pointer"
            >
                <X size={30}/>
            </button>
        </div>
    );
}

/* ------- react-select кастомизация под тёмный gold ------- */

const darkSelectStyles: StylesConfig<Option> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "#181a19",
        borderColor: state.isFocused ? "#AD9255" : "#333433",
        boxShadow: "none",
        minHeight: 40,
        height: 40,
        borderRadius: '2px',
        ':hover': {borderColor: "#AD9255"},
    }),
    valueContainer: (base) => ({
        ...base,
        height: 40,
        overflowX: 'auto',
        flexWrap: 'wrap',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "#0e0e0e",
        border: "1px solid rgba(255,255,255,0.1)",
        zIndex: 50,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "rgba(234,179,8,0.25)"
            : state.isFocused
                ? "rgba(234,179,8,0.12)"
                : "transparent",
        color: "rgba(255,255,255,0.92)",
        cursor: "pointer",
    }),
    placeholder: (base) => ({...base, color: "rgba(255,255,255,0.4)"}),
    singleValue: (base) => ({...base, color: "rgba(255,255,255,0.92)"}),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#57492B",
        borderRadius: "2px",
        border: "1px solid #AD9255",
    }),
    multiValueLabel: (base) => ({...base, color: "rgba(255,255,255,1)"}),
    multiValueRemove: (base) => ({
        ...base,
        cursor: "pointer",
        ':hover': {},
    }),
    input: (base) => ({...base, color: "rgba(255,255,255,0.92)"}),
};
