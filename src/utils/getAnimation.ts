export function getAnimation(isVisible: boolean, animation: string) {
    return isVisible ? `opacity-100 ${animation}` : 'opacity-0';
}