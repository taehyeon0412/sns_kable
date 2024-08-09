"use client";

interface InputProps {
  label: string;
  name: string;
  kind?: "text";
  errors?: string[];
  [key: string]: any; //input으로 오는 모든 props를 받게 해놓음
}

export default function Input({
  label,
  name,
  errors = [],
  kind = "text", //kind의 기본값은 text이고 나머지값들은 객체로 받아옴
  ...rest //input으로 오는 모든 props를 ...rest로 받음
}: InputProps) {
  return (
    <div>
      <label
        className="my-3 mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>

      {kind === "text" ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            name={name}
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}

      {errors?.map((error, index) => (
        <span
          key={index}
          className="flex flex-col pt-1 pl-1 text-red-500 text-xs font-semibold"
        >
          {error}
        </span>
      ))}
    </div>
  );
}
