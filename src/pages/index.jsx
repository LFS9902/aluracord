import Title from '../components/Title';
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../../config.json'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import imgBackground from '../../src/img/background.png';
import imgNotFound from '../../src/img/notFound.png'

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Title title='Boas vindas de volta' tag='h1' />
//       <h3>Discord - Alura Matrix</h3>
//     </div>
//   )
// }

// export default HomePage

async function Api(user) {
  const req = await fetch(`https://api.github.com/users/${user}`)
  const data = await req.json()
  return data
}

export default function HomePage() {
  const [user, setUser] = useState('');
  const [infoGit, setInfoGit] = useState({login: 'LFS9902', name: 'Luis Fernando'})
  const router = useRouter()

  function newUser(user) {
    Api(user).then(resp => {
      if (resp.message == 'Not Found') {
        setInfoGit({})
      }
      setInfoGit(resp)
    })
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `url(${imgBackground.src})`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Form */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault()
              if(infoGit.name){
                router.push('/Chat')
              } else {
                alert('Insira seu usuário do GitHub!!!')
              }
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2" content="Seja bem-vindo(a)!" />
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              <p style={{ marginTop: '10px' }}>Sua jornada começa aqui 🚀 </p>
            </Text>

            <TextField
              fullWidth
              placeholder='Insira seu nome de usuário do GitHub'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
            <Button
              type='button'
              label='Alterar Usuário'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{
                marginTop: '10px'
              }}
              onClick={() => newUser(user)}
            />
          </Box>
          {/* Form */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                width: '166px',
                height: '166px'
              }}
              src={infoGit.name ? `https://github.com/${infoGit.login}.png` : imgNotFound.src}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {infoGit.name ? infoGit.name : 'Não encontrado'}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}