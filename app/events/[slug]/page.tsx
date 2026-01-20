import Image from "next/image";
import { notFound } from "next/navigation";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => {
    return <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
}

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
    return <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {
                agendaItems.map(item => (
                    <li key={item}>
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>
}

const EventTags = ({ tags }: { tags: string[] }) => {
    return <div className="flex flex-row gap-1.5 flex-wrap">
        {
            tags.map(tag => (
                <div className="pill" key={tag}>{tag}</div>
            ))
        }
    </div>
}

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const res = await fetch(`${base_url}/api/events/${slug}`)
    const { event } = await res.json()
    const { description, image, overview, date, time, location, mode, agenda, audience, organizer, tags } = event;

    if (!event) return notFound();

    return (
        <section id='event'>
            <div id="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                {/* left side */}
                <div className="content">
                    <Image src={image} alt="banner" width={400} height={400} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={(date as string)} />
                        <EventDetailItem icon="/icons/clock.svg" alt="time" label={(time as string)} />
                        <EventDetailItem icon="/icons/pin.svg" alt="location" label={(location as string)} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={(mode as string)} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={(audience as string)} />
                    </section>

                    <EventAgenda agendaItems={JSON.parse(agenda[0])} />

                    <section className="flex-col-gap-2">
                        <h2>About the organiser</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={JSON.parse(tags[0])} />
                </div>

                {/* right side */}
                <aside className="booking">
                    <p className="text-lg font-semibold">Book Event</p>
                </aside>
            </div>
        </section>
    )
}

export default EventDetailsPage;