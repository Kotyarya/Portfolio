"use client";

import React from "react";
import Select, {type ActionMeta, type MultiValue, type SingleValue, type StylesConfig} from "react-select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {X} from "lucide-react";
import {buildProjectsQuery} from '@/utils/projectQuery';

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
            const queryString = buildProjectsQuery(urlSearchParams.toString(), {
                query,
                category: category?.value,
                status: status?.value,
                stacks: stacks.map(stack => stack.value),
            });
            router.replace(queryString ? `${pathname}?${queryString}` : pathname, {scroll: false});
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
            if (!option) return;

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
                <label htmlFor="proj-cat" className="text-gold-primary font-taviraj text-base">Category</label>
                <Select<Option, false>
                    instanceId="proj-cat"
                    inputId="proj-cat"
                    options={catOptions}
                    value={category}
                    onChange={onCategory}
                    placeholder="All"
                    isClearable
                    className="w-[170px] z-40 font-lato text-3xs "
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Tech stacks (multi) */}
            <div className="flex items-center gap-4.5">
                <label htmlFor="proj-stacks" className="text-gold-primary font-taviraj text-base">Technologies</label>
                <Select<Option, true>
                    instanceId="proj-stacks"
                    inputId="proj-stacks"
                    options={skillOptions}
                    value={stacks}
                    onChange={onStacks}
                    placeholder="All"
                    isSearchable={false}
                    isMulti
                    className="w-[250px] max-h-9.5 z-40 font-lato text-3xs"
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Status */}
            <div className="flex items-center gap-4.5 max-laptop:hidden">
                <label htmlFor="proj-status" className="text-gold-primary font-taviraj text-base">Status</label>
                <Select<Option, false>
                    instanceId="proj-status"
                    inputId="proj-status"
                    options={statusOptions}
                    value={status}
                    onChange={onStatus}
                    placeholder="All"
                    isClearable
                    className="w-[180px] z-40 font-lato text-3xs"
                    classNamePrefix="rs"
                    styles={darkSelectStyles}
                />
            </div>

            {/* Search */}
            <div className="w-50 max-desk:hidden">
                <label htmlFor="project-search" className="sr-only">Search projects</label>
                <input
                    id="project-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search…"
                    className="w-full h-10 font-lato text-3xs rounded-[2px] bg-black-primary text-white placeholder-[rgba(255,255,255,0.4)] px-3 outline-none border border-black-100  focus:border-gold-primary transition"
                />
            </div>

            {/* Reset */}
            <button
                type="button"
                aria-label="Clear all project filters"
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
