import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { maxWidth } from '@mui/system';
import Image from 'next/image';
import { NextPage } from 'next';

interface Props {
  winner: boolean;
  team: string;
  owner: string;
  pic: string;
}

const PodiumCard: NextPage<Props> = ({ winner, team, owner, pic }) => {
  return (
    <Card>
      <div>
        <Image
          layout="responsive"
          src={pic ? pic : '/F12022TemplateCar.png'}
          width="772.5"
          height="215.5"
        />
        {/* <CardMedia
          component="img"
          image={pic ? pic : 'F12022TemplateCar.png'}
          alt="f1Car"
        /> */}
      </div>
      <CardContent>
        <Typography
          noWrap
          sx={{
            margin: 'auto',
            textOverflow: 'ellipsis',
            maxWidth: { xs: '100%', sm: '200px', lg: '100%' }, // percentage also works
            mb: -1,
          }}
          align="center"
          variant="h6"
          component="div"
        >
          {team}
        </Typography>
        <Typography align="center" variant="h5" component="div">
          {owner}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PodiumCard;
