// components/QuantityInput.tsx
interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  disabled?: boolean;
}

export default function QuantityInput({
  value = 1,
  onChange,
  max = 999,
  disabled = false,
}: QuantityInputProps) {
  const increment = () => onChange(Math.min(max, value + 1));
  const decrement = () => onChange(Math.max(1, value - 1));

  return (
    <div className="inline-flex items-center border border-gray-400 rounded-md overflow-hidden font-medium mr-2">
      <button
        onClick={decrement}
        disabled={disabled || value <= 1}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 disabled:bg-gray-300 border-r border-gray-400"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          />
        </svg>
      </button>

      <div className="w-10 h-10 flex items-center justify-center bg-white">
        <span className="text-lg font-bold text-gray-900 tabular-nums tracking-tight">
          {value}
        </span>
      </div>

      <button
        onClick={increment}
        disabled={disabled || value >= max}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed border-l border-gray-400"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
      </button>
    </div>
  );
}
