import { useEffect, useState } from "react";
import styles from "@/styles/border.module.css"; // Assuming this imports your custom styles
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from 'next/link'; // Import Link from next/link

//DUMMY DATA
export const Division = [
  {
    department: "CTO",
    division: "Web Design",
    staff: [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ],
  },
  {
    department: "CTO",
    division: "FrontEnd Developer",
    staff: [
      { name: "David" },
      { name: "Eve" },
      { name: "Frank" },
    ],
  },
  {
    department: "CTO",
    division: "QA Engineer",
    staff: [
      { name: "Grace" },
      { name: "Hank" },
    ],
  },
  {
    department: "CTO",
    division: "Backend Developer",
    staff: [
      { name: "Ivy" },
      { name: "Jack" },
      { name: "Karen" },
    ],
  },
];

export default function ListDivision() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalDivisions, setTotalDivisions] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      try {
        const divisionData = Division; // Data dummy
        setTotalDivisions(divisionData.length);

        const staff = [];
        divisionData.forEach(({ staff: members }) => {
          members.forEach((member) => {
            staff.push(member);
          });
        });

        setTotalStaffs(staff.length);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  const description =
    "The Division Management feature empowers C-Level executives to oversee and control organizational divisions effectively. Executives can create, edit, and delete divisions, as well as view and manage personnel assigned to each division. This tool ensures streamlined management, enabling C-Level leaders to maintain organizational structure and optimize team performance.";

  return (
    <div className="w-full">
      <div className="flex gap-3 mt-5 relative max-lg:flex-col">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Bagian Total (40%) */}
            <div className="flex flex-row gap-3 basis-2/5">
              <div className="bg-primary flex-1 py-3 px-4 rounded-lg flex flex-col items-start">
                <span className="font-medium text-sm">Total Divisions</span>
                <span className="font-bold text-[40px] mt-2 leading-[56px]">
                  {totalDivisions}
                </span>
              </div>
              <div className="bg-primary flex-1 py-3 px-4 rounded-lg flex flex-col items-start">
                <span className="font-medium text-sm">Total Personnel</span>
                <span className="font-bold text-[40px] mt-2 leading-[56px]">
                  {totalStaffs}
                </span>
              </div>
            </div>

            {/* Bagian Description (60%) */}
            <div className="basis-3/5 bg-primary flex flex-col py-3 px-4 rounded-lg relative">
              <span className="font-medium text-sm">Description</span>
              <span className="text-sm mt-2 mb-6 text-justify">
                {isExpanded ? description : description.slice(0, 100) + "..."}
              </span>
              {description.length > 100 && (
                <button
                  className="text-blue-500 absolute bottom-3 right-3 cursor-pointer mt-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Divisions List */}
      <div>
        <ul className="list-none mt-2">
          {Division.map((division) => (
            <li
              key={division.division}
              className="border-2 border-primary p-5 bg-[#0D2735] mt-5 rounded-lg"
            >
              <div className="flex justify-between">
                {/* Division Information */}
                <div className="flex flex-col">
                  <span className="text-md">{division.division}</span>
                  <p className="text-xs text-grey">Internal</p>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex gap-2 items-center">
                  <button className="bg-secondary rounded-[4px] p-1">
                    <Link href="/">
                      <FaEdit />
                    </Link>
                  </button>
                  <button
                    onClick={() => {
                      // Implement delete logic
                    }}
                    className="bg-danger rounded-[4px] p-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}