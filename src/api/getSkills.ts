import {unstable_cache} from "next/cache";
import {baseAPI, type IApiResponse} from "@/api/http";
import type {ISkill} from "@/types/blocksDataTypes";
import {cache} from "react";

export const getSkillByIdCached = cache(async (id: number) => {
    return unstable_cache(
        async () => {
            const skill = await baseAPI
                .get<IApiResponse<ISkill>>(`skills/${id}`)
                .then((r) => r.data);

            return skill.data;
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