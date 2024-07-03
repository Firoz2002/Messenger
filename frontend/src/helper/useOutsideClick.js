import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            callback();
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('clcik', handleClick);
        };
    }, []);

    return ref;
}

export default useOutsideClick;