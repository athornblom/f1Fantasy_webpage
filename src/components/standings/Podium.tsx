// @ts-nocheck
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Grid } from '@mui/material';
import PodiumCard from './PodiumCard';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useRef, useCallback, useEffect } from 'react';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const canvasStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

interface Props {
  title: string;
  rows: any;
}

const Podium: NextPage<Props> = ({ title, rows }) => {
  useEffect(() => {
    // Update the document title using the browser API
    fire();
  }, []);

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      // @ts-ignore
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
      sx={{
        marginBottom: 2,
        position: 'relative',
      }}
    >
      <Grid item xs={12}>
        <Typography align="center" gutterBottom variant="h2">
          {title}
        </Typography>
      </Grid>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Grid item xs sx={{ display: { xs: 'none', md: 'block' } }}>
        <PodiumCard
          winner={false}
          team={rows[2][2]}
          owner={rows[2][3]}
          pic={rows[2][13]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={6} onMouseEnter={fire}>
        <PodiumCard
          winner={true}
          team={rows[1][2]}
          owner={rows[1][3]}
          pic={rows[1][13]}
        />
      </Grid>
      <Grid item xs sx={{ display: { xs: 'none', md: 'block' } }}>
        <PodiumCard
          winner={false}
          team={rows[3][2]}
          owner={rows[3][3]}
          pic={rows[3][13]}
        />
      </Grid>
    </Grid>
  );
};

export default Podium;
