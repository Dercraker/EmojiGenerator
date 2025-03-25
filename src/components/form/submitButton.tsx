import type { ButtonProps } from "@ui/button";
import { useFormStatus } from "react-dom";
import { LoadingButton } from "./loadingButton";

type SubmitButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export const SubmitButton = ({
  children,
  isLoading,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton loading={pending || isLoading} {...props}>
      {children}
    </LoadingButton>
  );
};
