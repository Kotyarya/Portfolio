import {unstable_cache} from "next/cache";
import {baseAPI, type IApiResponse} from "@/api/http";
import type {ISkill} from "@/types/blocksDataTypes";
import {cache} from "react";
import {getLocalRecruiterSkill, withRecruiterSkill} from '@/content/recruiterProfile';

export const getSkillByIdCached = cache(async (id: number) => {
    const localSkill = getLocalRecruiterSkill(id);
    if (localSkill) return localSkill;

    return unstable_cache(
        async () => {
            const skill = await baseAPI
                .get<IApiResponse<ISkill>>(`skills/${id}`)
                .then((r) => r.data);

            return withRecruiterSkill(skill.data);
        },
        [`skill:${id}`],
        {
            revalidate: 86400,
            tags: ["skills", `skill:${id}`]
        }
    )();
});

export const getSkillById = async (id: number) => {
    return getSkillByIdCached(id);
};
