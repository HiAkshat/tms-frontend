export type CustomButtonProps = {
  onClick?: MouseEventHandler<HTMLElement>,
  type?: "submit" | "button" | "reset" | undefined,
  text: string,
  width?: string,
  backgroundColor?: string,
  color?: string,
  border?: string
}
