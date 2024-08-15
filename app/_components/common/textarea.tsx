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
        className="mt-1 shadow-sm w-full min-h-40 focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
        rows={4}
        name={name}
        {...rest}
      />
    </div>
  );
}
