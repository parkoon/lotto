type DividerProps = {
  gutter?: number
}
export const Divider = ({ gutter = 16 }: DividerProps) => {
  return (
    <div className="h-px w-full bg-gray-800" style={{ marginBlock: gutter }} />
  )
}
