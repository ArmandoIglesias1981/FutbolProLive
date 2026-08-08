interface InputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  name,
  type = "text",
  value = "",
  placeholder = "",
  required = false,
}: InputProps) {

  return (

    <div className="mb-5">

      <label className="block mb-2 font-semibold text-gray-700">

        {label}

      </label>

      <input
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

    </div>

  );

}