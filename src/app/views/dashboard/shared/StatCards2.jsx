import { Card, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';
import Url from '../../../../global';
import { useEffect, useState } from 'react';
const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important'
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px'
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px'
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' }
}));

const StatCards2 = () => {
  const [display, setDisplay] = useState([]);
  const Staffs = display.length;
  const Techies = display.filter((item) => item.designation === 'Software Developer').length;
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);
  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      Url.get('staff/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res);
          setDisplay(res.data);
          console.log(display);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, []);
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
              <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
            </FabIcon>
            <H3 textcolor={'#08ad6c'}>Staffs</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{Staffs}</H1>
          </ContentBox>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
              <Icon sx={{ color: textError }}>star_outline</Icon>
            </FabIcon>
            <H3 textcolor={textError}>Techies</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{Techies}</H1>
          </ContentBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
