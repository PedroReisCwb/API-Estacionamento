import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import Usuario from 'App/Models/usuarios_estacionamentos'

Route.get('/', async () => {
  return '<BR><BR><BR><CENTER><FONT COLOR="GREEN"><H1>CLUBE CURITIBANO <BR><BR> API ESTACIONAMENTO</FONT></H1></CENTER>'
})

Route.group(() => {
  // VEICULO
  Route.group(() => {
    // Rota para buscar dados do veículo do associado
    Route.get(':dias', 'VeiculosController.buscarDadosVeiculo').middleware('auth:web,api')
  }).prefix('/veiculos')
}).prefix('/estacionamento')

Route.post('/usuario', async ({ request }) => {
  const { email, password } = request.all()
  const usuario = new Usuario()
  usuario.email = email
  usuario.password = password

  await usuario.save()

  return usuario
})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')
  const usuario = await Usuario.query().firstOrFail()

  // Verify password
  if (!(await Hash.verify(usuario.password, password))) {
    return response.badRequest('Invalid credentials')
  }

  try {
    //const token = await auth.use('api').attempt(email, password)
    const token = await auth.use('api').generate(usuario)

    return token
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('api').logout()

  return 'Logout'
})

Route.get('dashboard', async ({ auth }) => {
  await auth.use('api').authenticate()

  return auth.use('api').token
})
