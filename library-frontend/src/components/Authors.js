
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN } from '../queries'

const Authors = (props) => {
  const [birthyear, setBirthyear] = useState('')
  const [name, setName] = useState('')

  const [editAuthorBorn] = useMutation(EDIT_BORN)

  if (!props.show) {
    return null
  }
  if (!props.authors) {
    return (
      <div>
        <h2>authors</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!birthyear) return null

    const setBornTo = parseInt(birthyear)

    editAuthorBorn({ variables: { name, setBornTo } })

    setBirthyear('')
    setName('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th />
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {props.authors.map(a =>
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!props.token
        ? null
        : (
          <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
              <div>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                  <option value=''>Select Author</option>
                  {
              props.authors.map(a =>
                <option value={a.name} key={a.name}>{a.name}</option>
              )
            }
                </select>
              </div>
              <div>
                born
                <input
                  type='number'
                  value={birthyear}
                  onChange={({ target }) => setBirthyear(target.value)}
                />
              </div>
              <button type='submit'>update author</button>
            </form>
          </div>
          )}

    </div>
  )
}

export default Authors
