import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';

import { orderService } from '../../services/order.service';
import { AppHeaderMinimized } from '../../cmps/Header/AppHeaderMinimized';
import { Footer } from '../../cmps/Footer/Footer'
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { updateOrder } from '../../store/actions/order.actions';

export function ProfileIndex() {
    const [loggedUser, setLoggedUser] = useState(null);
    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const location = useLocation()
    const dispatch = useDispatch()
    const userType = location.pathname.includes("renter")


    useEffect(() => {
        setLoggedUser(sessionStorage.loggedinUser ? JSON.parse(sessionStorage.loggedinUser) : null)
    }, [])

    useEffect(() => {
        orderService.query()
            .then((orders) => {
                if (userType) {
                    const userOrders = orders.filter((order) => order.hostId === loggedUser?.id)
                    dispatch({ type: 'SET_ORDERS', orders: userOrders })
                }

                else {
                    const userOrders = orders.filter((order) => order.buyer._id === loggedUser?.id)
                    dispatch({ type: 'SET_ORDERS', orders: userOrders })
                }
            })
            .catch((err) => {
                console.log('Failed to load orders in ProfileIndex', err);
            })
    }, [loggedUser])


    function onUpdateOrder(order, value) {
        const newOrder = { ...order, status: value }
        updateOrder(newOrder).then((order) => {
            console.log('saved order', order);
        }).catch((err) => {
            console.log('Error in updating order in ProfileIndex', err);
        })
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


    return (
        <>
            <AppHeaderMinimized hideFilter={true} />

            <main className='profile'>
                <h1>Welcome, {loggedUser?.fullname.split(' ')[0]}!</h1>
                <h1>{userType ? 'Upcoming orders' : 'Upcoming reservations'}</h1>

                <div className="reservations">
                    {orders && orders.map((order, idx) => (
                        <div className="order-card" key={order.id}>
                            <div className="order-summary">
                                <h3>{order.stay.name}</h3>
                                <p>Order placed by {order.buyer.fullname}</p>
                            </div>
                            <div className="order-dates">
                                <p>{format(new Date(order.checkIn), 'dd MMM')} - {format(new Date(order.checkOut), 'dd MMM')} ({format(new Date(order.checkIn), 'yyyy')})</p>
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