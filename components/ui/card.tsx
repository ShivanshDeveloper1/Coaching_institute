import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: DivProps) {
  return <div className={`bg-white border border-gray-200 rounded-xl ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`flex flex-col gap-1.5 p-6 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: DivProps) {
  return <div className={`font-bold leading-tight text-gray-900 ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: DivProps) {
  return <div className={`text-sm text-gray-500 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`p-6 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: DivProps) {
  return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />;
}
