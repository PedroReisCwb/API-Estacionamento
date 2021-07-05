import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return '<BR><BR><BR><CENTER><FONT COLOR="GREEN"><H1>CLUBE CURITIBANO <BR><BR> API ESTACIONAMENTO</FONT></H1></CENTER>'
})

Route.group(() => {
  // VEICULO
  Route.group(() => {
    // Rota para buscar dados do veículo do associado
    Route.get(':dias', 'VeiculosController.buscarDadosVeiculo').middleware('auth:api')
  }).prefix('/veiculos')

  // USUARIO
  Route.group(() => {
    // Rota para gerar novos usuários
    Route.post('/', 'UsuariosController.usuario')
    // Rota para gerar token usuários
    Route.post('/login', 'UsuariosController.login')
    // Rota para desconectar usuários
    Route.post('/logout', 'UsuariosController.logout')
    // Rota para visualizar dashboard usuários
    Route.get('/dashboard', 'UsuariosController.dashboard')
  }).prefix('/usuarios')
}).prefix('/estacionamento')
