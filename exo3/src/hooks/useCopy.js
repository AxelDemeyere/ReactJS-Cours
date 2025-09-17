import { useState } from 'react';

export const useCopy = () => {
    const [copied, setCopied] = useState(false);

    const copy = async (text) => {
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                setCopied(true);

                // Reset après 1,5s
                setTimeout(() => setCopied(false), 1500);

                return true;
            } else {
                console.error('Clipboard API not supported');
                return false;
            }
        } catch (error) {
            console.error('Copy failed:', error);
            return false;
        }
    };

    return { copy, copied };
};
