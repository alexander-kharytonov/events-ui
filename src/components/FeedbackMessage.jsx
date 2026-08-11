import { HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";

const variants = {
  error: {
    icon: HiExclamationTriangle,
    styles: "bg-red-50 text-red-700",
  },
  success: {
    icon: HiCheckCircle,
    styles: "bg-emerald-50 text-emerald-700",
  },
};

export default function FeedbackMessage({ children, type = "error" }) {
  const { icon: Icon, styles } = variants[type];
  return (
    <p className={`flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${styles}`} role={type === "error" ? "alert" : "status"}>
      <Icon className="mt-0.5 shrink-0 text-lg" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
