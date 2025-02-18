import { useState } from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Box,
} from '@mui/joy';
import { useNavigate, useHref, Form, useLoaderData } from 'react-router-dom';

const busModal = () => {
  const data = useLoaderData();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const href = useHref();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal onClose={handleClose} open>
      <ModalDialog>
        <ModalClose />
        {href.split('/').reverse()[0] === 'delete' ? (
          <>
            {' '}
            <Typography component="h2" sx={{ mb: 2 }}>
              Confirmation
            </Typography>
            <Typography textColor="text.tertiary">
              Are you sure you want to delete this bus?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'flex-end',
                pt: 2,
              }}
            >
              <Button onClick={handleClose} variant="plain" color="neutral">
                Cancel
              </Button>
              <Form method="post">
                <Button type="submit" variant="solid" color="danger">
                  Delete
                </Button>
              </Form>
            </Box>
          </>
        ) : (
          <>
            {' '}
            <Typography level="h5" sx={{ textTransform: 'capitalize', mb: 2 }}>
              {href.split('/').reverse()[0]} bus
            </Typography>
            <Form encType="multipart/form-data" method="post">
              <Stack spacing={2}>
                <FormControl sx={{ color: 'blue' }}>
                  <FormLabel>route</FormLabel>
                  <Input
                    defaultValue={data?.name}
                    placeholder="Enter bus rout"
                    name="name"
                    
                  />
                </FormControl>

                <FormControl sx={{ color: 'blue' }}>
                  <FormLabel>depatcher time</FormLabel>
                  <Input
                    type='time'
                    defaultValue={data?.email}
                    placeholder="Enter bus depatcher time"
                    name="detime"
                  />
                </FormControl>

                <FormControl sx={{ color: 'blue' }}>
                  <FormLabel>arrival time</FormLabel>
                  <Input
                    type='time'
                    defaultValue={data?.email}
                    placeholder="Enter bus arrival time"
                    name="email"
                  />
                </FormControl>

                <FormControl sx={{ color: 'blue' }}>
                  <FormLabel>bus number</FormLabel>
                  <Input
                    defaultValue={data?.phone}
                    placeholder="Enter bus number"
                    name="phone"
                  />
                </FormControl>

                <FormControl sx={{ color: 'blue' }}>
                  <FormLabel>Upload Picture</FormLabel>
                  <Button color="neutral" component="label" htmlFor="profile">
                    {!file && data?.profile}
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      id="profile"
                      name="profile"
                      style={{
                        display: file
                          ? 'inline'
                          : data?.profile
                          ? 'none'
                          : 'inline',
                      }}
                    />
                  </Button>
                </FormControl>

                <Button color={data ? 'warning' : 'primary'} type="submit">
                  {data ? 'Update bus' : 'Create new bus'}
                </Button>
              </Stack>
            </Form>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default busModal;
