"use client";
import { Button } from "@/registry/new-york/ui/button";
import React from "react";

const ErrorComponent = ({error, reset}:{error: Error, reset: any}) => {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
};

export default ErrorComponent;
