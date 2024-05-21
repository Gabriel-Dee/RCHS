import { Designer } from "@grapecity/activereports-react";
import { DesignerProps } from "@grapecity/activereports-react";
import React, { useEffect, useRef } from "react";
import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-designer.css";

const DesignerWrapper: React.FC<DesignerWrapperProps> = (props) => {
  const ref = useRef<Designer>(null);

  useEffect(() => {
    // Set the report URI when it changes
    if (ref.current && props.reportUri) {
      ref.current.setReport({ id: props.reportUri });
    }
  }, [props.reportUri]);

  return <Designer {...props} ref={ref} />;
};

export interface DesignerWrapperProps extends DesignerProps {
  reportUri: string;
}

export default DesignerWrapper;
