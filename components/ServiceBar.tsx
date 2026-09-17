const items = [
  ["COMPLIMENTARY SHIPPING", "On orders over $75"],
  ["EASY RETURNS", "Within 30 days*"],
  ["SECURE PAYMENTS", "Protected checkout"],
  ["MADE TO MOVE", "Everyday-focused essentials"],
];

export default function ServiceBar() {
  return <section className="border-y border-[#e4d9d3] bg-[#f1e9e4]" aria-label="Customer service highlights"><div className="mx-auto grid max-w-7xl divide-y divide-[#e4d9d3] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{items.map(([title, text]) => <div key={title} className="px-5 py-5 text-center sm:px-6"><p className="text-[9px] font-semibold tracking-[.18em]">{title}</p><p className="mt-1 text-[10px] opacity-55">{text}</p></div>)}</div></section>;
}
