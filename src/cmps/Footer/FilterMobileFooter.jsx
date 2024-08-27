import { useState } from 'react'

import { motion } from 'framer-motion'
import { SearchIcon } from '../SVG/HeaderSvg'


export function FilterMobileFooter() {
    // const [isSelected, setIsSelected] = useState(null)

    // function handleClick(el) {
    //     setIsSelected(el)
    // }

    return (
        <motion.footer className='mobile-footer filter'
            key="nav-options"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 0 }}
            transition={{ duration: 0.3 }}>

            <div className={`clear-all`}>
                <p>Clear all</p>
            </div>

            <div className={`search`}>
                <button>
                    <SearchIcon />
                    <p>Search</p>
                </button>
            </div>
        </motion.footer>
    )
}