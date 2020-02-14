import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const NotFound = ({ property }: { property: string }) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          404 - Az oldal nem található
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default NotFound;
