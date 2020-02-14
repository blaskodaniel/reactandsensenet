import React from "react";
import Typography from "@material-ui/core/Typography";

export interface IFullScreenLoader {
  text: string;
}

const FullScreenLoader: React.FunctionComponent<IFullScreenLoader> = ({
  text
}) => (
  <React.Fragment>
    <div
      style={{
        position: "fixed",
        top: "47px",
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        background: "rgba(6, 6, 6, 0.62)",
        zIndex: 1000,
        color: "white",
        alignItems: "center"
      }}
    >
      <Typography component={'span'} variant={'body2'}
        style={{
          display: "block",
          marginLeft: "15px"
        }}
      >
        {text}
      </Typography>
    </div>
  </React.Fragment>
);

export default FullScreenLoader;
