import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { LoginSignup } from '../Header/LoginSingup'
import { useCountries } from "use-react-countries";
import { login, signup } from '../../store/actions/user.actions';


export function AuthModal() {
    const isOpenAuthModal = useSelector((storeState) => storeState.appModule.isOpenAuthModal)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false); // Initially not valid
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
    const { countries } = useCountries()
    const [selectedcountry, setSelectedcountry] = useState(countries[0]);
    const loggedUser = useSelector((storeState) => storeState.userModule.user)
    const phoneNumberRegex = /^\+?(\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

    useEffect(() => {
        setIsSubmitted(false)
    }, [])

    useEffect(() => {
    }, [loggedUser])

    function handleChange(event) {
        const value = event.target.value;
        const selectedCountry = countries.find((country) => country.name === value)
        setSelectedcountry(selectedCountry);
    }

    function handlePhoneChange(e) {
        const input = e.target.value;
        setPhoneNumber(input);

        if (phoneNumberRegex.test(input)) {
            setIsValid(true); // If valid, set isValid to true
        } else {
            setIsValid(false); // If invalid, set isValid to false
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            setIsSubmitted(true); // Only set to true if the form is valid
        } else {
            setIsSubmitted(false); // Remain false if not valid
        }
    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials);
            showSuccessMsg(`Welcome: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot login');
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials);
            showSuccessMsg(`Welcome new user: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot signup');
        }
    }


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

                    {!isSubmitted ?
                        <div className="enter-credentials">
                            <h1>Welcome to Airbnb</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="country-select">
                                    <label htmlFor="country-select">
                                        Country code
                                    </label>

                                    <select id="country-select" value={selectedcountry?.name} onChange={handleChange}>
                                        {countries.map((country) => (
                                            <option key={country.name} value={country.name}>
                                                {country.name} ({country.countryCallingCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="phone-number">
                                    <label htmlFor="phone-number">
                                        Phone number
                                    </label>

                                    <div>
                                        <p>{selectedcountry?.countryCallingCode}</p>

                                        <input id="phone-number"
                                            type="text"
                                            placeholder="Enter your phone number"
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}>
                                        </input>

                                        {/* {!isValid && <p style={{ color: 'red' }}>Please enter a valid phone number</p>} */}
                                    </div>
                                </div>

                                <div className="submit-button">
                                    <button className="primary-bg" type="submit">Continue</button>
                                </div>
                            </form>

                        </div> :
                        <div className="enter-credentials login-layout">
                            <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={false} />
                        </div>}

                </motion.div>}
        </AnimatePresence>
    )
}