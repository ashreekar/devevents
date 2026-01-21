"use client"
import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react"

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();

        const { sucess } = await createBooking({ eventId, slug, email });

        if (sucess) {
            setSubmitted(true)
        } else {
            console.error("Booking creation failed")
        }
    }

    return (
        <div id="book-event">
            {
                submitted ? (
                    <p className="text-sm">Thank you for signing up!</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email adress</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="Enter your email adress" />
                        </div>
                        <button type="submit" className="button-submit">Submit</button>
                    </form>
                )
            }
        </div>
    )
}

export default BookEvent