import { motion, useAnimation } from 'framer-motion';
import { sectionAnimation } from '../utils/animations';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ac from '../assets/icon/ac.png';
import chair from '../assets/icon/kursi.png';
import kulkas from '../assets/icon/kulkas.png';
import wifi from '../assets/icon/wifi.png';
import cctv from '../assets/icon/cctv.png';
import parking from '../assets/icon/parking.png';

const facilityItems = [
    {
        icon: wifi,
        text: 'Wifi kecepatan tinggi',
    },
    {
        icon: kulkas,
        text: 'Dapur Bersama',
    },
    {
        icon: ac,
        text: 'Air Conditioner',
    },
    {
        icon: chair,
        text: 'Ruang Bersama',
    },
    {
        icon: cctv,
        text: 'CCTV dan Keamanan Terjamin',
    },
    {
        icon: parking,
        text: 'Lahan Parkir Luas',
    },
];

const FacilitySection = () => {
    const useItemAnimation = (threshold = 0.3) => {
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
    const [refFacility, controlsFacility] = useItemAnimation();
    

    return (
        <motion.section className="facility" ref={refFacility}
            initial="hidden"
            animate={controlsFacility}
            variants={sectionAnimation}
            transition={{ duration: 0.5 }}
        >
            <div className="kosan__facility text-[44px] flex flex-col items-center p-20">
                <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Facility</h1>
                <p className="text-[32px] text-center">Kosan dilengkapi dengan fasilitas berikut</p>
                <div className="icon__container">
                    {facilityItems.map((item, index) => (
                        <motion.div className="icon__item" key={index}
                            initial="hidden"
                            animate={controlsFacility}
                            variants={sectionAnimation}
                            transition={{ duration: 0.5, delay: index * 0.2 }}>
                            <img src={item.icon} className="border-b-4 border-[#435334] w-fit" />
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default FacilitySection;