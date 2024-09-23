import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';

import { orderService } from '../../services/order.service';
import { AppHeaderMinimized } from '../../cmps/Header/AppHeaderMinimized';
import { Footer } from '../../cmps/Footer/Footer'
import { format } from 'date-fns';

export function ProfileIndex() {
    const [loggedUser, setLoggedUser] = useState(null);
    const [orders, setOrders] = useState(null);
    const location = useLocation()
    const userType = location.pathname.includes("renter")


    useEffect(() => {
    }, [location])

    useEffect(() => {
        setLoggedUser(sessionStorage.loggedinUser ? JSON.parse(sessionStorage.loggedinUser) : null)
    }, [])

    useEffect(() => {
        orderService.query()
            .then((orders) => {
                const userOrders = orders.filter((order) => order.buyer._id === loggedUser?.id)
                setOrders(userOrders)
            })
            .catch((err) => {
                console.log('Failed to load orders in ProfileIndex', err);
            })
    }, [loggedUser])


    function onUpdateOrder(order, value) {
        const newOrder = { ...order, status: value }
        orderService.save(newOrder).then((updatedOrder) => {
            // Update the local orders state to reflect the change
            setOrders((prevOrders) =>
                prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
            );
        }).catch((err) => {
            console.log('Failed to update order', err);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


    return (
        <>
            <AppHeaderMinimized hideFilter={true} />

            <main className='profile'>
                <h1>Welcome, {loggedUser?.fullname.split(' ')[0]}!</h1>

                <div className="reservations">
                    {orders && orders.map((order, idx) => (
                        <div className="order-card" key={order.id}>
                            <div className="order-summary">
                                <h3>{order.stay.name}</h3>
                                <p>Order placed by {order.buyer.fullname}</p>
                            </div>
                            <div className="order-dates">
                                <p>{format(new Date(order.checkIn), 'dd MMM')} - {format(new Date(order.checkOut), 'dd MMM')}</p>
                                <p>{format(new Date(order.checkIn), 'yyyy')}</p>
                            </div>
                            <div className='order-status'>
                                {order.status === 'pending' && userType ? (
                                    <select
                                        value={order.status}
                                        onChange={(e) => onUpdateOrder(order, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                ) : <p className={`${order.status}`}>{capitalizeFirstLetter(order.status)}</p>}
                            </div>
                            <div className="order-location">
                                <p>{order.stay.address.market}, {order.stay.address.country}</p>
                            </div>
                            <div className="order-images">

                                <div className="main-image">
                                    <img src={order.stay.images.picture_url} alt="Main Image" />
                                </div>

                                {order.stay.images.additional.slice(1, 3).map((imgUrl, imgIdx) => (
                                    <img key={imgIdx} src={imgUrl} alt={`Image ${imgIdx + 2}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* <Outlet /> */}
            </main>

            <Footer />
        </>
    )
}