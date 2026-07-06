const GRADIENTS = [
  "from-indigo-500 via-violet-500 to-purple-600",
  "from-sky-500 via-cyan-500 to-teal-500",
  "from-amber-500 via-orange-500 to-rose-500",
  "from-emerald-500 via-teal-500 to-cyan-600",
  "from-fuchsia-500 via-pink-500 to-rose-500",
];

export function gradientFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 997;
  return GRADIENTS[hash % GRADIENTS.length];
}
