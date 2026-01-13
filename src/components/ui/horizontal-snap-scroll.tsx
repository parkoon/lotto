type HorizontalSnapScrollWrapperProps = {
  items: React.ReactNode[]
}
export const HorizontalSnapScrollWrapper = ({
  items,
}: HorizontalSnapScrollWrapperProps) => {
  return (
    <div className="w-full">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-2 pr-4 pl-4">
        {items.map((item, idx) => (
          <div key={idx} className="w-[240px] flex-shrink-0 snap-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
