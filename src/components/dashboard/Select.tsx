import { Dispatch, SetStateAction } from "react";

type SelectReport = {
  name: string;

  value: string;
};

export default function Select({
  data,
  value,
  setValue,
  id = "",
  className = "",
}: {
  data: SelectReport[];
  value: string | any[];
  setValue: any;
  id?: string;
  className?: string;
}) {
  return (
    <select
      className="bg-secondary text-primary font-medium rounded-[4px] py-1 px-3 max-lg:w-full"
      name=""
      onChange={(e) => {
        setValue(e.target.value);
      }}
      id={id}
    >
      {data.map(({ name, value }, index) => {
        return (
          <option
            key={index}
            className="bg-white !p-2 hover:bg-secondary"
            value={value}
          >
            {name}
          </option>
        );
      })}
    </select>
  );
}
