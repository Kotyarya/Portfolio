"use client";
import React, {useEffect} from 'react';
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import type {ISkill} from "@/types/blocksDataTypes";
import {X} from "lucide-react";
import Button from "@/ui/Button";
import {useRouter} from "next/navigation";
import SkillVisual from '@/ui/SkillVisual';

interface SkillModalProps {
    activeSkill?: ISkill,
    closeModal: () => void;
}

const SkillModal = ({activeSkill, closeModal}: SkillModalProps) => {

    const {name, img, text} = activeSkill || {};
    const [innerWidth, setInnerWidth] = React.useState<number>(0);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);

        function handleResize() {
            setInnerWidth(window.innerWidth);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const router = useRouter();

    if (!mounted) return null;

    return (
        <Dialog open={true} onClose={closeModal} className="relative z-[1000]">
            <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-sm"/>
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="pointer-events-auto max-h-[calc(100dvh-2rem)] w-fit overflow-y-auto bg-gold-gradient p-1 shadow-gold-regular">
                    <div className="relative flex w-163 flex-col items-center gap-5 bg-black p-16 max-ipad:w-100 max-mobile:!w-[90vw] max-mobile:px-6 max-mobile:py-12">
                    {activeSkill && <SkillVisual skill={{...activeSkill, img: img ?? ''}} size="modal"/>}
                    <DialogTitle as="h2" className="text-center font-cinzel text-xl font-bold text-gold-primary">{name}</DialogTitle>
                    <p className="font-lora text-3xs text-white text-center">{text}</p>
                    <p className="font-lora text-base text-gold-primary text-center">See where I used it.</p>
                    <Button text={"View Projects"} size={innerWidth < 575 ? 'medium' : 'large'}
                            onClick={() => router.push((innerWidth >= 848 ? `/projects?stacks=${encodeURIComponent(activeSkill?.name || "")}` : "/projects"))}/>
                    <button
                        type="button"
                        data-autofocus
                        aria-label="Close skill details"
                        className='absolute right-4.5 top-4.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded text-gold-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary'
                        onClick={closeModal}>
                        <X size={30}/>
                    </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default SkillModal;
