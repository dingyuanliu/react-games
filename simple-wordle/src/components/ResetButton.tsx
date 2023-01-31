import { memo } from "react";

export const ResetButton = memo(({ onReset }: { onReset: () => void }) => {
  return <button onClick={onReset}>Reset</button>;
});
