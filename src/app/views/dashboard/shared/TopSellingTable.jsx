import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme
} from '@mui/material';
import Moment from 'react-moment';

import { Paragraph } from 'app/components/Typography';
import { useState, useEffect } from 'react';
import Url from '../../../../global';
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize'
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)'
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' }
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)'
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [display, setDisplay] = useState([]);
  const uploadUri = Url.defaults.UPLOAD_URI;
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  useEffect(() => {
    Url.get('fees/view_fees')
      .then((res) => {
        console.log('datafees', res.data);
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Recent Fees collected</Title>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={2}>
                Student
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Division
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Amount
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {display.slice(-5).map((item, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    {item?.std_id?.image ? (
                      <Avatar src={`${uploadUri}/${item?.std_id?.image}`} />
                    ) : (
                      <Avatar src={imageUrl} />
                    )}
                    <Paragraph sx={{ m: 0, ml: 4 }}>{item?.std_id?.student_name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {item?.div_id?.d_name ? (
                    item?.div_id?.d_name == 'QueueTech Solution' ? (
                      <Small bgcolor={bgSecondary}>{item?.div_id?.d_name}</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>{item?.div_id?.d_name}</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>{item?.div_id?.d_name}</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {item?.amount} ( {item?.pay_type} )
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <Moment format="DD-MM-YYYY">{item?.f_date}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    price: 100,
    available: 15
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    price: 1500,
    available: 30
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    price: 1900,
    available: 35
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    price: 100,
    available: 0
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    price: 1190,
    available: 5
  }
];

export default TopSellingTable;
