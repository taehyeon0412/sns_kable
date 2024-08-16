interface TextAreaProps {
  label?: string;
  name?: string;
  errors?: string[];
  [key: string]: any;
}

export default function TextArea({
  label,
  labelName,
  name,
  errors = [],
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={labelName}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}

      <textarea
        id={labelName}
        className="mt-1 px-2 py-2 shadow-sm w-full min-h-40 focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:border-2 border rounded-md border-gray-300 "
        rows={4}
        name={name}
        {...rest}
      />

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
