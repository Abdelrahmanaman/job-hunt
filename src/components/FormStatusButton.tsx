"use client";

import { Loader } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
export default function FormStatusButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <LoadingButton {...props} type="submit" loading={pending} />
  );
}
