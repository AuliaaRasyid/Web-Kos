import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const useSectionAnimation = (threshold = 0.5) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold });

    useEffect(() => {
        console.log('InView:', inView);
        if (inView) {
            controls.start('show');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    return [ref, controls];
};

export default useSectionAnimation;