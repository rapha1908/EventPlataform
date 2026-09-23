import { Navigate, Route, Routes } from "react-router-dom";
import { Event } from "./Pages/Event"
import { Home } from "./Pages/Home";

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Navigate to="/" replace />} />
            <Route path="/event/:eventSlug" element={<Event  />} />
            <Route path="/event/:eventSlug/lesson/:slug" element={<Event  />} />

        </Routes>
        );
}
