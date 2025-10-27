import type {ISkill} from "@/types/blocksDataTypes";
import React, {useLayoutEffect, useMemo, useRef, useState} from "react";
import SkillBlock from "@/ui/SkillBlock";

interface ColumnScroller {
    skills: ISkill[];
    direction: 'up' | 'down';
    delayOffsetSec: number;
}

const ColumnScroller = ({skills, direction, delayOffsetSec}: ColumnScroller) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    const [cycleHeight, setCycleHeight] = useState(0);

    useLayoutEffect(() => {
        if (!listRef.current) return;
        const rect = listRef.current.getBoundingClientRect();
        setCycleHeight(rect.height);
    }, [skills]);

    const VISIBLE_WINDOW_PX = 500;

    const animationName = direction === 'up' ? 'scroll-up' : 'scroll-down';

    const trackStyle: React.CSSProperties & {
        ['--scroll-distance']?: string;
    } = useMemo(
        () => ({
            ['--scroll-distance']: cycleHeight + 'px',
            animationName,
            animationDuration: '45s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${delayOffsetSec}s`,
        }),
        [cycleHeight, animationName, delayOffsetSec]
    );

    return (
        <div
            className="overflow-hidden relative"
            style={{
                height: VISIBLE_WINDOW_PX + 'px',
            }}
        >
            <div
                className="will-change-transform"
                style={trackStyle}
            >
                <div
                    ref={listRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '30px',
                        alignItems: 'center',
                    }}
                >
                    {skills.map((skill, i) => (
                        <SkillBlock
                            key={`orig-${i}`}
                            skill={skill}
                        />
                    ))}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '30px',
                        alignItems: 'center',
                    }}
                >
                    {skills.map((skill, i) => (
                        <SkillBlock
                            key={`clone-${i}`}
                            skill={skill}
                        />
                    ))}
                </div>
            </div>
            <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-[120px]"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
                }}
            />
            <div
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-[120px]"
                style={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)',
                }}
            />
        </div>
    );
}

export default ColumnScroller;