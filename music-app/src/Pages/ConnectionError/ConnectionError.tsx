import React from "react";
import { Container } from "../../components/Container";
import { Page, SectionTitle } from "../../components/UI";
import Lottie from "react-lottie";
import error from "../../data/animations/noServer.json";

export const ConnectionError = () => {
  return (
    <Page>
      <Container>
        <SectionTitle center>No connection to the server</SectionTitle>
        <Lottie
          options={{
            autoplay: true,
            loop: true,
            animationData: error,
          }}
          height={400}
          width={400}
        />
      </Container>
    </Page>
  );
};
