/* globals test, expect */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter as Router } from 'react-router-dom'
import Login from '../components/Login'

const server = setupServer(
  rest.get('https://notes-api.glitch.me/api/users', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login component has a username and password field', () => {
  const { getByLabelText } = render(<Router><Login onLogin={() => {}} /></Router>)
  const usernameField = getByLabelText('Username')
  const passwordField = getByLabelText('Password')
  expect(usernameField).toBeInTheDocument()
  expect(passwordField).toBeInTheDocument()
})

test('Login component can log us in', async () => {
  let loggedIn = false
  const { getByLabelText, getByText } = render(<Router><Login onLogin={() => { loggedIn = true }} /></Router>)
  const usernameField = getByLabelText('Username')
  fireEvent.change(usernameField, { target: { value: 'testuser' } })
  const passwordField = getByLabelText('Password')
  fireEvent.change(passwordField, { target: { value: 'password' } })
  fireEvent.click(getByText('Log In'))
  await waitFor(() => {
    expect(loggedIn).toBe(true)
  })
})
