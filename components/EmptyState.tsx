import Image from "next/image"

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <section className="empty-state">
        <div>
            <Image src={icon} alt={title} width={46} height={46} />
        </div>
        <article>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </article>
    </section>
  )
}

export default EmptyState