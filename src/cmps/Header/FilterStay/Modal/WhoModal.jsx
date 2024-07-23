import { useState } from "react"

export function WhoModal() {
    const [adultCount, setAdultCount] = useState(0)
    const [childrenCount, setChildrenCount] = useState(0)
    const [infantCount, setInfantCount] = useState(0)
    const [petCount, setPetCount] = useState(0)

    return (
        <div className="who-modal">
            <div className="adults">
                <div className="description">
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </div>

                <div className="amount-controller">
                    <p className={`decrease ${adultCount < 1 ? 'disabled' : ''}`} onClick={adultCount > 0 ? () => { setAdultCount(prev => prev - 1) } : ''}>-</p>
                    <p className="amount">{adultCount}</p>
                    <p className="increase" onClick={() => { setAdultCount(prev => prev + 1) }}>+</p>
                </div>
            </div>

            <div className="children">
                <div className="description">
                    <h3>Children</h3>
                    <p>Ages 2 - 12</p>
                </div>

                <div className="amount-controller">
                    <p className={`decrease ${childrenCount < 1 ? 'disabled' : ''}`} onClick={childrenCount > 0 ? () => { setChildrenCount(prev => prev - 1) } : ''}>-</p>
                    <p className="amount">{childrenCount}</p>
                    <p className="increase" onClick={() => { setChildrenCount(prev => prev + 1) }}>+</p>
                </div>
            </div>

            <div className="infants">
                <div className="description">
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </div>

                <div className="amount-controller">
                    <p className={`decrease ${infantCount < 1 ? 'disabled' : ''}`} onClick={infantCount > 0 ? () => { setInfantCount(prev => prev - 1) } : ''}>-</p>
                    <p className="amount">{infantCount}</p>
                    <p className="increase" onClick={() => { setInfantCount(prev => prev + 1) }}>+</p>
                </div>
            </div>

            <div className="pets">
                <div className="description">
                    <h3>Pets</h3>
                    <p><span>Bringing a service animal?</span></p>
                </div>

                <div className="amount-controller">
                    <p className={`decrease ${petCount < 1 ? 'disabled' : ''}`} onClick={petCount > 0 ? () => { setPetCount(prev => prev - 1) } : ''}>-</p>
                    <p className="amount">{petCount}</p>
                    <p className="increase" onClick={() => { setPetCount(prev => prev + 1) }}>+</p>
                </div>
            </div>
        </div>
    )
}

