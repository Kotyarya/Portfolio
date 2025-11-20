import {unstable_cache} from "next/cache";
import {baseAPI, type IApiResponse} from "@/api/http";
import type {ISkill} from "@/types/blocksDataTypes";

const getSkillByIdCached = unstable_cache(
    async (id: number) => {
        const skill = await baseAPI
            .get<IApiResponse<ISkill>>(`skills/${id}`)
            .then(r => r.data);

        return skill.data;
    },
    ['skill-by-id'],
    {
        revalidate: 60,
        tags: ['skill'],
    }
);

export const getSkillById = async (id: number) => {
    return getSkillByIdCached(id);
};