import ExploreBtn from "@/components/ExploreBtn";

const Page = () => {
  return (
    <section className="text-center">
      <h1>The Hub For Every Dev <br /> Events you can't miss</h1>
      <p className="text-center mt-5">Hackathons, meetups and conferences. All in one place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {
            [1, 2, 3, 4, 5, 6].map((event) => (
              <li key={event}>Event {event}</li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default Page;