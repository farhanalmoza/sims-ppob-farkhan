const FormInput = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-black w-full focus:outline-none"
      required
    />
  );
}

export default FormInput;