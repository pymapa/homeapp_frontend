
interface ToastNotification {
  id: string,
  timer: number | null,
  text: string,
  type: "success" | "info" | "warning" | "error"
}