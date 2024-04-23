"use client";

import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
export default function FormStatusButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center">
        {pending && <Loader className="size-6 animate-spin gap-2" />}

        {!pending && props.children}
      </span>
    </Button>
  );
}
