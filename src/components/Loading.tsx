import React from "react";
import Image from "next/image";
import { Container } from "@mui/material";
import styles from "./Loading.module.css";

function Loading() {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div className={styles.spinning}>
        <Image
          src="/kvs-logo-frame.png"
          width="200"
          height="200"
          alt=" Frame of logo "
        />
      </div>
      <Image
        src="/kvs-logo-text.png"
        width="200"
        height="200"
        alt=" Text of logo "
      />
    </Container>
  );
}

export default Loading;
