import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    update: (proxy, mutationResult) => {
      const token = mutationResult.data.login.value
      window.localStorage.setItem('token', token)
      props.setToken(token)
      props.setPage('authors')
    },
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!username || !password) return null

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <div>
        <h2>login</h2>
        <div>
          <form onSubmit={submit}>
            <div>
              username
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                value={password}
                type='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>Login</button>
          </form>
        </div>

      </div>
    </div>

  )
}

export default LoginForm
