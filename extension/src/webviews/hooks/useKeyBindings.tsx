import { useEffect } from "react";

export function useKeyBindings(callback: (keyCode: string) => void, keyCodes: string[], dependency): void {
    const handler = ({ code }: KeyboardEvent) => {
        if (keyCodes.includes(code)) {
            callback(code);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [dependency]);
}