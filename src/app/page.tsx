import { Service } from "@/lib/types";

const services: Service[] = [
  {
    title: "Duty Import Calculator",
    description: "Calculate the cost of importing a car in Malawi",
    url: "/mra/duty-calculator",
  },
  {
    title: "Malawi POSTCODES",
    description: "All post codes for malawi",
    url: "/macra/postcodes",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {services.map((service) => (
          <a
            href={service.url}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            key={service.url}
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {service.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {service.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
