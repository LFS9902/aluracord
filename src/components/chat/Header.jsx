import { Box, Text, Button, Image } from '@skynexui/components';
import { useContext } from 'react';
import { AuthContext } from '../../components/providers/auth';
import imgGitHub from '../../img/gitHub.png'

export default function Header() {

  const {user, setUser , infoGit, setInfoGit } = useContext(AuthContext)

  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Box>
        <Image
          styleSheet={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
          }}
          src={infoGit.id ? `https://github.com/${user}.png` : imgGitHub.src}
        />
        <Text variant='heading5' styleSheet={{margin: 'auto'}}>
          Olá, {infoGit.name}!
        </Text>
        </Box>
        <Text variant='heading4'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          onClick={() => {
            setUser('')
            setInfoGit({ name: 'Insira seu usuário', status: true }
            )
          }}
          href="/"
        />
      </Box>
    </>
  )
}