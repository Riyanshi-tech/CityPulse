import {BrowserRouter,Routes,Route} from 'react-router-dom'
 import Login from '../pages/auth/Login.tsx';
import Register from '../pages/auth/Register.tsx';
import Home from '../pages/events/Home.tsx';
import EventDetails from '../pages/events/EventDetails.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import Layout from '../components/layout/Layout.tsx';
import SeatSelection from "../pages/booking/SeatSelection";
import Payment from '../pages/payment/payment.tsx';
import TicketPage from '../pages/tickets/TicketPage.tsx';
import MyTickets from '../pages/tickets/myTickets.tsx';
import MyFavorites from '../pages/Favorites/myFavorites.tsx';
import OrganizerDashboard from '../pages/organizer/Dashboard.tsx';
import CreateVenue from '../pages/organizer/CreateVenue.tsx';
import CreateSeats from '../pages/organizer/CreateSeat.tsx';
import CreateEvent from '../pages/organizer/CreateEvent.tsx';
import MyEvents from '../pages/organizer/MyEvents.tsx';

export default function AppRoutes() {
    useAuth(); // Keeping hook if it has side effects, else could remove entirely
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events/:id" element={<Layout><EventDetails /></Layout>} />
                <Route path="/booking/:eventId" element={<Layout><SeatSelection /></Layout>}/>
                <Route path="/payment/:bookingId" element={<Payment />} />
                <Route path="/tickets/:bookingId" element={<Layout><TicketPage /></Layout>} />
                <Route path="/tickets" element={<Layout><MyTickets /></Layout>} />
                <Route path="/favorites" element={<MyFavorites />} />
                <Route path="/organizer" element={<OrganizerDashboard />} />
                <Route path="/organizer/create-venue" element={<CreateVenue />} />
                <Route path="/organizer/create-seats/:venueId" element={<CreateSeats />} />
                <Route path="/organizer/create-event" element={<CreateEvent />} />
                <Route path="/organizer/my-events" element={<MyEvents />} />
            </Routes>
        </BrowserRouter>
    );
}

