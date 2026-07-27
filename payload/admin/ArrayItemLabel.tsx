"use client";
import { useRowLabel } from "@payloadcms/ui";

interface Props {
  path: string;
}

export default function ArrayItemLabel({ path }: Props) {
  const { data } = useRowLabel();

  const label = path
    .split(".")
    .reduce((accumulator: any, key: string) => accumulator?.[key], data as any);

  return <div>{label}</div>;
}
