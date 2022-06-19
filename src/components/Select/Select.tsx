import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  onChange: (selected: Option | null) => void;
  selected: Option | null;
  width?: string;
  margin?: string;
  placeholder?: string;
}

export default function SelectComponent({
  options,
  onChange,
  selected,
  width = "200px",
  placeholder = "Select a category",
  margin = "0",
}: SelectProps) {
  const selectStyles = {
    control: (base: any, { isFocused }: { isFocused: boolean }) => ({
      ...base,
      width,
      margin,
      padding: "0.5rem",
      height: "3rem",
      border: "none",
      boxShadow: isFocused ? `0 0 0 2px var(--main-red)` : "none",
      "@media (max-width: 600px)": {
        width: "93vw",
      },
    }),
    option: (base: any) => ({
      ...base,
      width: "90%",
      height: "3rem",
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      backgroundColor: "var(--main-white)",
      color: "var(--main-text-color)",
      padding: "0.5rem",
      cursor: "pointer",
      fontSize: "14px",
      ":hover": {
        backgroundColor: "var(--main-red)",
        color: "var(--main-white)",
      },
    }),
    menu: (base: any) => ({
      ...base,
      padding: "0.5rem",
      backgroundColor: "var(--main-white)",
    }),

    menuList: (base: any) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "10px",
      },

      "::-webkit-scrollbar-track": {
        background: "transparent",
        margin: "10px",
        borderRadius: "3px",
      },

      "::-webkit-scrollbar-thumb": {
        background: "#979595",
        borderRadius: "8px",
      },
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      ":hover": {
        color: "var(--main-blue)",
      },
      cursor: "pointer",
    }),
    placeholder: (base: any) => ({
      ...base,
      fontSize: "14px",
    }),
  };
  return (
    <Select
      options={options}
      onChange={onChange}
      isSearchable
      styles={selectStyles}
      placeholder={placeholder}
      value={selected}
    />
  );
}
