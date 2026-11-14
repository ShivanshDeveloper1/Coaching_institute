"use client";

import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext<{ value: string; setValue: (v: string) => void } | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (v: string) => void;
}

export function Tabs({ defaultValue, value, onValueChange, className = "", children, ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const setValue = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={`inline-flex items-center ${className}`} {...props} />;
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className = "", children, ...props }: TriggerProps) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button
      type="button"
      role="tab"
      data-state={active ? "active" : "inactive"}
      onClick={() => ctx?.setValue(value)}
      className={`inline-flex items-center justify-center text-sm font-semibold cursor-pointer ${
        active ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className = "", ...props }: ContentProps) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div role="tabpanel" className={className} {...props} />;
}
