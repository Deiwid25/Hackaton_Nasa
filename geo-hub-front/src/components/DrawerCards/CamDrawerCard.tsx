import {
    Box,
    Button,
    Card,
    CardActionArea,
    // CardActions,
    CardContent,
    CardMedia,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { GeoJsonProperties } from 'geojson';
import { CloseIcon } from '../../assets/icons/SiataIcons';

interface CardDrawerProps {
    featureData: GeoJsonProperties;
    onDelete: () => void;
}

const CamDrawerCard = ({ featureData, onDelete }: CardDrawerProps) => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <div
            style={!isMobile ? drawerWrappedStyleDesktop : drawerWrappedStyleMobile}>
            <Box>
                {/* <Typography variant='bodyBold3' color='white'>
            Comparativo
          </Typography> */}
            </Box>
            <Card
                sx={{
                    borderRadius: '8px',
                }}>
                <CardActionArea
                    disableRipple
                    sx={{
                        cursor: 'auto',
                    }}>
                    <CardContent
                        sx={{
                            background: 'var(--neutral-50)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '0 -20px 0 0'
                        }}>
                        <Typography variant='body2'>
                            {featureData?.properties?.nombre}
                        </Typography>
                        <Button
                            size='small'
                            onClick={onDelete}
                            sx={{
                                color: 'var(--primary-500)',
                            }}>
                            <CloseIcon />
                        </Button>
                    </CardContent>
                    <CardMedia
                        component='img'
                        image={featureData?.properties?.url}
                        alt={`Cámara  ${featureData?.properties?.nombre}`}
                        sx={{
                            padding: '10px',
                        }}
                    />
                </CardActionArea>
                {/* <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Button
              size='small'
              color='primary'
              sx={{
                textTransform: 'none',
              }}>
              Descripción +
            </Button>
          </CardActions> */}
            </Card>
        </div>
    );
};

const drawerWrappedStyleDesktop = {
    width: '34vw',
    backgroundColor: 'rgba(8,31,45,0.6)',
    margin: '1vh 0',
};

const drawerWrappedStyleMobile = {
    width: '100%',
    backgroundColor: 'rgba(8,31,45,0.8)',
    margin: '1vh 0',
    // padding: '1rem',
};

export { CamDrawerCard };
