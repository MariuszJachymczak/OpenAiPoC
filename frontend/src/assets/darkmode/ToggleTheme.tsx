interface ToggleThemeProps {
  onChange: () => void;
  children: React.ReactNode;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ onChange }) => {
  return (
    <label
      htmlFor="Toggle1"
      className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
      onChange={onChange}
    >
      <span>Light</span>
      <span className="relative rounded-sm">
        <input id="Toggle1" type="checkbox" className="hidden peer" />
        <div className="w-10 h-6 rounded-full shadow-inner dark:bg-bg01 peer-checked:dark:bg-bg02"></div>
        <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-600"></div>
      </span>

      <span>Dark</span>
    </label>
  );
};

export default ToggleTheme;
