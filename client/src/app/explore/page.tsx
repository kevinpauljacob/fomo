import Card from "@/components/explore/Card";

const dataset = [
  {
    src: "/assets/image1.avif",
    href: "/link/destination1",
    title: "Music Festival Spectacular",
    description:
      "Experience the ultimate music festival with top artists performing live, food stalls, and exciting activities for all music enthusiasts.",
  },
  {
    src: "/assets/image2.avif",
    href: "/link/destination2",
    title: "Adventure Trekking Expedition",
    description:
      "Embark on an adventurous trekking expedition through breathtaking landscapes, challenging terrains, and hidden trails.",
  },
  {
    src: "/assets/image3.avif",
    href: "/link/destination3",
    title: "Art Gallery Opening Night",
    description:
      "Join us for an exclusive art gallery opening night featuring stunning artworks from talented local and international artists.",
  },
  {
    src: "/assets/image4.avif",
    href: "/link/destination4",
    title: "Tech Innovation Conference",
    description:
      "Discover the latest trends and innovations in technology at our exclusive conference, featuring keynote speeches, workshops, and networking opportunities.",
  },
  {
    src: "/assets/image5.avif",
    href: "/link/destination5",
    title: "Culinary Delight Tour",
    description:
      "Indulge your taste buds in a culinary delight tour showcasing the finest cuisines, gourmet dishes, and culinary experiences from around the world.",
  },
];

export default function page() {
  return (
    <div className="min-h-[calc(100vh-161px)] max-h-full max-w-[768px] mx-auto mt-7">
      <div className="border-b border-white/20 pb-5 mb-5">
        <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
        <p className="text-lg font-base text-white text-opacity-90">
          Discover a world of excitement with our diverse range of events.
          Explore unique experiences and create unforgettable memories today.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {dataset.map((data, index) => (
          <Card
            key={index}
            src={data.src}
            href={data.href}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
}
