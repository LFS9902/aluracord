import { Box, Text, Image, Button } from '@skynexui/components';
import { useState } from 'react';
import appConfig from '../../../config.json';


export default function MessageList({ messages }) {

  const [loader, setLoader] = useState(true)

  setTimeout(() => {
    setLoader(false)
  },1000)

  if(loader){
    return(
      <div className='loader'></div>
    )
  } else {
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflow: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: '16px',
        }}
      >
  
        {messages.map((message) => {
          return (
            <Text
              key={message.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                marginRight: '5px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Image
                    styleSheet={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                    src={`https://github.com/${message.login}.png`}
                  />
                  <Text tag="strong">
                    {message.from}
                  </Text>
                  <Text
                    styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {message.date}
                  </Text>
                </Box>
                <Box>
                  {/* Futura Implementação */}
                  {/* <Button
                    type='button'
                    label='X'
                    
                    buttonColors={{
                      contrastColor: appConfig.theme.colors.neutrals["000"],
                      mainColor: appConfig.theme.colors.primary[500],
                      mainColorLight: appConfig.theme.colors.primary[400],
                      mainColorStrong: appConfig.theme.colors.primary[600],
                    }}
                  /> */}
                </Box>
              </Box>

              {message.messageText.startsWith(':sticker:')
                ? (<Image src={message.messageText.replace(':sticker:', '')} styleSheet={{
                  width: '100px',
                  height: '100px',
                }}/>) 
                : (message.messageText)
              }
            </Text>
          )
        })
  }
    </Box>
  )}
}