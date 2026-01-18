import Eventcard from "@/components/Eventcard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const Page = () => {
  return (
    <section className="text-center">
      <h1>The Hub For Every Dev <br /> Events you can't miss</h1>
      <p className="text-center mt-5">Hackathons, meetups and conferences. All in one place</p>

      <ExploreBtn />

      <div className="mt-10 space-y-2">
        <h3>Featured Events</h3>

        <ul className="events">
          {
            events.map((event) => (
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