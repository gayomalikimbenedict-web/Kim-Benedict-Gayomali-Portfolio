type SectionHeadProps = {
  id: string
  eyebrow: string
  title: string
  lede?: string
}

export function SectionHead({ id, eyebrow, title, lede }: SectionHeadProps) {
  return (
    <header>
      <span className="eyebrow" data-reveal>
        {eyebrow}
      </span>
      <h2 id={id} data-reveal>
        {title}
      </h2>
      {lede ? (
        <p className="lede" data-reveal>
          {lede}
        </p>
      ) : null}
    </header>
  )
}
