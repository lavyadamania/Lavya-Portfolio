export function SkillBar({ name, icon: Icon }) {
  return (
    <div className="mb-3 last:mb-0">
      <span className="flex items-center gap-2 font-grotesk text-sm text-text2">
        {Icon && <Icon className="text-lg text-pink" />}
        {name}
      </span>
    </div>
  )
}
