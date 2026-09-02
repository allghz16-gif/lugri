export default function CTAButton({ children, onClick, href }) {
  const classes =
    "bg-lime-400 hover:bg-lime-300 text-black font-semibold px-6 py-2 rounded-full transition";

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}