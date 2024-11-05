const AuthForm = ({title, onSubmit, children}) => {
  return (
    <div className="mt-10">
      <form
        onSubmit={onSubmit}
        className="grid gap-4"
      >
        {children}
        <button type="submit" className="w-full bg-[#f13b2e] text-white mt-10 py-2 px-4 rounded-lg">
          {title}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;