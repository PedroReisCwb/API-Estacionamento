// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/usuarios_estacionamentos'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsuariosController {
  public async usuario({ request }) {
    const { email, password } = request.all()
    const usuario = new Usuario()
    usuario.email = email
    usuario.password = password

    await usuario.save()

    return usuario
  }

  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    const usuario = await Usuario.query().firstOrFail()

    if (!(await Hash.verify(usuario.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    try {
      const token = await auth.use('api').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ auth }) {
    await auth.use('api').logout()

    return 'Logout'
  }

  public async dashboard({ auth }) {
    await auth.use('api').authenticate()

    return auth.use('api').token
  }
}
