/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Grid } from '@mui/material';
import PodiumCard from './PodiumCard';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useRef, useCallback, useEffect } from 'react';
import { Typography } from '@mui/material';
import { NextPage } from 'next';
import styles from './podium.module.css';

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
      <ReactCanvasConfetti
        refConfetti={getInstance}
        className={styles.canvasStyles}
      />
      <Grid item xs sx={{ display: { xs: 'none', md: 'block' } }}>
        <PodiumCard
          winner={false}
          team={rows[1].team}
          owner={rows[1].owner}
          pic={rows[1].image}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={6} onMouseEnter={fire}>
        <PodiumCard
          winner={true}
          team={rows[0].team}
          owner={rows[0].owner}
          pic={rows[0].image}
        />
      </Grid>

      <Grid item sm sx={{ display: { xs: 'none', md: 'block' } }}>
        <PodiumCard
          winner={false}
          team={rows[2].team}
          owner={rows[2].owner}
          pic={rows[2].image}
        />
      </Grid>
    </Grid>
  );
};

export default Podium;
