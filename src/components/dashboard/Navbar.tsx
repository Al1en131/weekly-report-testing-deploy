import { getDateNow, getDayNow } from "@/utils/getDateNow";

export default function Navbar({ title }: { title: string }) {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-dash-nav max-lg:text-xl font-bold">{title}</h1>
      <div>
        <h2 className="text-sm text-grey">{getDayNow()}</h2>
        <h2 className="text-base text-white">{getDateNow()}</h2>
      </div>
    </nav>
  );
}
