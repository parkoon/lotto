type EmptyCardProps = {
  description: string
}
export const EmptyCard = ({ description }: EmptyCardProps) => {
  return (
    <div className="card flex h-[220px] items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/images/empty-box.png" alt="empty" width={64} height={64} />
        <p className="text-center text-sm whitespace-pre-line text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  )
}
