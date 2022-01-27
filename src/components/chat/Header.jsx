import { Box, Text, Button } from '@skynexui/components';
import { useContext } from 'react';
import { AuthContext } from '../../components/providers/auth';

export default function Header() {

  const { setUser, setInfoGit } = useContext(AuthContext)

  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          onClick={() => {
            setUser('')
            setInfoGit({name: 'Insira seu usuário', status: true}
          )}}
          href="/"
        />
      </Box>
    </>
  )
}