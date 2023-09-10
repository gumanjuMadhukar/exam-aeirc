import React, { useEffect, useState } from "react";

type Props = {
  disableKeyboard: boolean;
};

const withKeyboardDisabled = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & Props> => {
  const WithKeyboardDisabled: React.FC<P & Props> = ({
    disableKeyboard,
    ...props
  }) => {
    const [isKeyboardDisabled, setIsKeyboardDisabled] = useState<boolean>(true);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isKeyboardDisabled) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      if (isKeyboardDisabled) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isKeyboardDisabled]);

    useEffect(() => {
      setIsKeyboardDisabled(disableKeyboard);
    }, [disableKeyboard]);

    return isKeyboardDisabled ? null : <Component {...(props as P)} />;
  };

  return WithKeyboardDisabled;
};

export default withKeyboardDisabled;
