import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { iconWithClassName } from './iconWithClassName';

const AlertTriangle = React.forwardRef<Svg, SvgProps>((props, ref) => {
  return (
    <Svg
      ref={ref}
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01"
      />
    </Svg>
  );
});

AlertTriangle.displayName = 'AlertTriangle';

export { AlertTriangle };
export default iconWithClassName(AlertTriangle);