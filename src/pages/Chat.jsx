import { Box, TextField, Button } from '@skynexui/components';
import React, { useContext, useState, useEffect } from 'react';
import appConfig from '../../config.json';
import imgBackground from '../../src/img/background.png';

import Header from '../components/chat/Header';
import MessageList from '../components/chat/MessageList';
import dateNow from '../components/chat/DateNow';

import { createClient } from '@supabase/supabase-js';
import { AuthContext } from '../components/providers/auth';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4MTE0NSwiZXhwIjoxOTU4ODU3MTQ1fQ.dCSV21zZAEES9OayAjG52TLt946pY4a7nWAOmls53Wk'
const SUPABASE_URL = 'https://oveqdqsqcyvqfzzsmacf.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [listMessage, setListMessage] = useState([])

  const {infoGit} = useContext(AuthContext)

  useEffect(() => {
    const datasSupabase = supabaseClient.from('messages').select('*').order('id', {ascending: false})
    .then(({data}) => setListMessage(data))
  },[])

  function handleNewMessage(newMessage) {
    const message = {
      from: infoGit.name,
      messageText: newMessage,
      date: dateNow(),
      login: infoGit.login
    }

    supabaseClient.from('messages').insert([message]).then(({ data }) => {
      setListMessage([
        data[0],
        ...listMessage
      ])
    })
    setMessage('')
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url(${imgBackground.src})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList messages={listMessage} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  message.length > 0 && handleNewMessage(message)
                }
              }}
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              type='button'
              label='Enviar'
              onClick={() => message.length > 0 && handleNewMessage(message)}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}