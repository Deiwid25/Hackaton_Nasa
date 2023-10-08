export const getTokenContactApi = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_POST_CONTACT_TKN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    console.log('Response status:', response.status);
    const responseData = await response.json();
    if (response.ok) {
      return responseData.access;
    } else {
      console.log(
        'Error al obtener el token.',
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error('Error de red: ', error);
    return null;
  }
};

export const sendContactForm = async (data: FormData): Promise<boolean> => {
  const token = await getTokenContactApi(`${import.meta.env.VITE_USER_CONTACT}`, `${import.meta.env.VITE_PASSWORD_CONTACT}`);
  if (token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_POST_CONTACT_API}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log('Correo enviado exitosamente!');
        return true;
      } else {
        console.error('Error al enviar el correo.');
        return false;
      }
    } catch (error) {
      console.error('Error de red: ', error);
      return false;
    }
  } else {
    console.error('No se pudo obtener el token.');
    console.log(JSON.stringify(data));
    return false;
  }
};
