export const CONTACT_LIMITS = {
    name: 100,
    email: 254,
    message: 5000,
} as const;

type ContactField = keyof typeof CONTACT_LIMITS;

const requiredMessages: Record<ContactField, string> = {
    name: 'Please enter your name',
    email: 'Please enter your email',
    message: 'Please enter a message',
};

export const validateContactField = (field: ContactField, value: string): true | string => {
    if (!value.trim()) return requiredMessages[field];
    if (value.length > CONTACT_LIMITS[field]) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is too long`;
    }
    if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        return 'Please enter a valid email';
    }

    return true;
};
