import {
  Box,
  Button,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { sendContactForm } from '../../services/contactApi';
import { CloseIcon } from '../../assets/icons/SiataIcons';

export interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onCloseContactModal: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onCloseContactModal }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [sending, setSending] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const textFieldStyles = {
    background: 'var(--shades-0)',
    borderRadius: '16px',
    padding: '10px 0',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--neutral-200)',
        borderRadius: '16px',
      },
    },
    '& .Mui-focused': {
      fieldset: {
        borderColor: 'var(--neutral-200)!important',
      },
    },
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    setSending(true);
    const isSuccess = await sendContactForm(data);
    if (isSuccess) {
      reset();
      setSending(false);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 4000);
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          boxShadow: 24,
          padding: '24px',
          borderRadius: '8px',
          width: isMobile ? '80vw' : '50vw',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            gap: '10px',
            padding: '0 0 10px 0',
          }}>
          <Button
            sx={{
              color: 'var(--shades-50)',
              display: 'flex',
              position: 'fixed',
              right: isMobile ? '5vw' : '1.5vw',
              top: '1vh',
              padding: '0 0 20px 0',
              minWidth: '10px'
            }}
            onClick={onCloseContactModal}
          >
            <CloseIcon />
          </Button>
          <Typography
            variant='h3'
            sx={{
              padding: isMobile ? '20px 0 0 0' : '10px 0 0 0',
            }}>
            ¿Tienes alguna duda?
          </Typography>
          <Typography
            variant='body2'
            sx={{
              width: '80%',
              maxWidth: '400px',
            }}>
            Déjanos tus datos con la información que requieres, y te estaremos
            contactando.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 8,
                message: 'El nombre debe tener al menos 8 caracteres',
              },
              maxLength: {
                value: 34,
                message: 'El nombre debe tener máximo 34 caracteres',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='Nombre y Apellido'
                fullWidth
                sx={textFieldStyles}
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: 'Este campo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Dirección de correo electrónico inválida',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='E-mail'
                fullWidth
                sx={textFieldStyles}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
            )}
          />

          <Controller
            name='company'
            control={control}
            defaultValue=''
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 8,
                message: 'El nombre debe tener al menos 8 caracteres',
              },
              maxLength: {
                value: 34,
                message: 'El nombre debe tener máximo 34 caracteres',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='Empresa/Organización'
                fullWidth
                sx={textFieldStyles}
                error={Boolean(errors.company)}
                helperText={errors.company && errors.company.message}
              />
            )}
          />

          <Controller
            name='subject'
            control={control}
            defaultValue=''
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 8,
                message: 'El nombre debe tener al menos 8 caracteres',
              },
              maxLength: {
                value: 34,
                message: 'El nombre debe tener máximo 34 caracteres',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='Asunto'
                fullWidth
                sx={textFieldStyles}
                error={Boolean(errors.subject)}
                helperText={errors.subject && errors.subject.message}
              />
            )}
          />

          <Controller
            name='message'
            control={control}
            defaultValue=''
            rules={{
              required: 'Este campo es requerido',
              minLength: {
                value: 50,
                message: 'El mensaje debe tener al menos 50 caracteres',
              },
              maxLength: {
                value: 500,
                message: 'El mensaje debe tener máximo 500 caracteres',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='Mensaje'
                fullWidth
                multiline
                rows={6}
                sx={textFieldStyles}
                error={Boolean(errors.message)}
                helperText={errors.message && errors.message.message}
              />
            )}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={sending}
            endIcon={sending && <CircularProgress size={20} />}
            sx={{
              marginTop: '10px',
              float: 'right',
            }}>
            Enviar
          </Button>
        </form>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}>
        <SnackbarContent
          sx={{
            backgroundColor: 'var(--ica-green)',
            display: 'flex',
            justifyContent: 'center',
          }}
          message='¡Correo enviado exitosamente!'
        />
      </Snackbar>
    </div>
  );
};
