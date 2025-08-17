import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeaderDropdown.css';

const HeaderDropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }
    };

    return (
        <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="dropdown-toggle nav-link">
                {title}
                <motion.span
                    className="arrow"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    ▼
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="dropdown-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                    >
                        <div className="dropdown-background"></div>
                        {items.map((item, index) => (
                            <a href={item.href} key={index} target={'_blank'} className="dropdown-item" style={{
                                borderTopRightRadius: index === 0 ? '12px' : '0',
                                borderBottomRightRadius: index === items.length - 1 ? '12px' : '0',
                                borderTopLeftRadius: index === 0 ? '12px' : '0',
                                borderBottomLeftRadius: index === items.length - 1 ? '12px' : '0',
                            }}>
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeaderDropdown;