import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Loading from "../src/components/Loading";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Loading />
    </Container>
  );
};

export default Home;
