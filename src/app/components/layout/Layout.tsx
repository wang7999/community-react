import { Button, Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { Header } from "./header/Header"

export const Layout = () => {
  return (
    <div className='d-flex flex-column flex-column-fluid'>
      <Header />
      <Container fluid="xl">
      <Outlet />
      </Container>
    </div>
  )
}