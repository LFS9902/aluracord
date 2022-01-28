import Title from '../components/Title';
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../../config.json'
import { useContext } from 'react';
import { useRouter } from 'next/router';
import imgBackground from '../../src/img/background.png';
import imgNotFound from '../../src/img/notFound.png';
import imgGitHub from '../../src/img/gitHub.png'
import { AuthContext, Api } from '../components/providers/auth';

export default function HomePage() {
  const router = useRouter()
  const { user, setUser, infoGit, setInfoGit } = useContext(AuthContext)

  function newUser(user) {
    Api(user).then(resp => {
      if (resp.message == 'Not Found') {
        setInfoGit({})
      } else {
        setInfoGit(resp)
        setTimeout(()=> {
          router.push(`/Chat`)
        },700)
      }
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  user.length > 0 && newUser(user)
                }
              }}
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
              type='button'
              label='Entrar'
              disabled={user.length < 1 && true}
              onClick={() => newUser(user)}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
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
              src={infoGit.login ? `https://github.com/${infoGit.login}.png` : infoGit.status ? imgGitHub.src : imgNotFound.src}
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