interface SimpleLinkProps {
  link: string
  text: string
}

export default function SimpleLink({ link, text }: SimpleLinkProps) {
  return (
    <a href={link} className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  )
}
