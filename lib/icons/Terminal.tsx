import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { iconWithClassName } from './iconWithClassName';

const Terminal = React.forwardRef<Svg, SvgProps>((props, ref) => {
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
        d="m4 17 6-6-6-6M12 19h8"
      />
    </Svg>
  );
});

Terminal.displayName = 'Terminal';

export { Terminal };
export default iconWithClassName(Terminal);