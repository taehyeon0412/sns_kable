interface TextAreaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}

export default function TextArea({
  label,
  labelName,
  name,
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
        className="mt-1 px-2 py-2 shadow-sm w-full min-h-40 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md border border-gray-300 "
        rows={4}
        name={name}
        {...rest}
      />
    </div>
  );
}
