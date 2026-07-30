interface BadgeProps {
  category: string
}

const colorMap: Record<string, string> = {
  poetry: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  fiction: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  panel: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  workshop: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  default: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
}

export default function Badge({ category }: BadgeProps) {
  const normalized = category?.toLowerCase() || 'default'
  const colorClass = colorMap[normalized] || colorMap.default

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${colorClass}`}
    >
      {category}
    </span>
  )
}