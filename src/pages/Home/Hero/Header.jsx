import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { DESKTOP } from "@constants/devices";
import useResponsiveness from "@hooks/useResponsiveness";

const HeaderContainer = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  flex: 1;

  font-weight: 900;
  font-size: 3.5em;
  text-align: center;
  margin: auto;
`;

const Line = styled(motion.div)`
  white-space: nowrap;
  color: ${(props) => props.theme.colors.secondary};
`;

const HighlightedSpan = styled.span`
  color: ${(props) => props.theme.colors.white};
`;

export default function Header() {
  const { currentDevice } = useResponsiveness();
  const ctrls = useAnimation();

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: (t) => ({
      opacity: 1,
      y: `0em`,
      transition: {
        duration: t * 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  useEffect(() => {
    setTimeout(() => ctrls.start("visible"), 1000);
  }, [ctrls]);

  return (
    <HeaderContainer device={currentDevice}>
      <Line
        initial="hidden"
        aria-hidden="true"
        animate={ctrls}
        custom={1}
        variants={characterAnimation}
      >
        Go <HighlightedSpan>Private</HighlightedSpan>
      </Line>
      <Line
        initial="hidden"
        aria-hidden="true"
        animate={ctrls}
        custom={2}
        variants={characterAnimation}
      >
        Get{" "}
        <HighlightedSpan>
          {currentDevice === DESKTOP ? "Private People Networks" : "PPN"}
        </HighlightedSpan>
      </Line>
    </HeaderContainer>
  );
}
