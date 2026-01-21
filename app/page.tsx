import Eventcard from "@/components/Eventcard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";
// import { events } from "@/lib/constants";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const Page = async () => {
  "use cache";
  cacheLife('hours');

  const response = await fetch(`${base_url}/api/events`);
  const { events } = await response.json();

  return (
    <section className="text-center">
      <h1>The Hub For Every Dev <br /> Events you can't miss</h1>
      <p className="text-center mt-5">Hackathons, meetups and conferences. All in one place</p>

      <ExploreBtn />

      <div className="mt-10 space-y-2">
        <h3>Featured Events</h3>

        <ul className="events">
          {
            events && events.length>0 && events.map((event:IEvent) => (
              <li key={event.title}>
                <Eventcard {...event} />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default Page;