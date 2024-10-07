import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useCountries } from "use-react-countries";


export function AuthModal() {
    const isOpenAuthModal = useSelector((storeState) => storeState.appModule.isOpenAuthModal)
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { countries } = useCountries()

    function handleChange(event) {
        const selectedIndex = event.target.value;
        setSelectedIndex(countries[selectedIndex]);
    };

    return (
        <AnimatePresence >
            {isOpenAuthModal &&
                <motion.div
                    className={`${isOpenAuthModal ? 'auth-modal show' : ''}`}
                    initial={{ translateX: '-40%', y: 50, opacity: 0 }}
                    animate={{ translateX: '-40%', y: 0, opacity: 1 }}
                    exit={{ translateX: '-40%', y: 50, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="auth-modal-header">
                        <button>
                            <p>X</p>
                        </button>
                        <p>Log in or sign up</p>
                    </div>

                    <div className="enter-credentials">
                        <h1>Welcome to Airbnb</h1>

                        <form>
                            <label htmlFor="country-select">
                                <p>Country code</p>
                            </label>

                            <select id="country-select" value={countries[selectedIndex]} onChange={handleChange}>
                                {countries.map((country, index) => (
                                    <option key={country.name} value={index}>
                                        {country.name} ({country.countryCallingCode})
                                    </option>
                                ))}
                            </select>
                            <input></input>
                        </form>
                    </div>

                    <div>
                        <svg></svg>
                        <p>Continue</p>
                    </div>

                    <div>
                        <p>Not you? <span>Use another account</span></p>
                    </div>
                </motion.div>}
        </AnimatePresence>
    )
}