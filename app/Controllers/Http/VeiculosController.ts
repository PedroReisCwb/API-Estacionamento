// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class VeiculosController {
  public async buscarDadosVeiculo({ response, params }) {
    const historicoDias = params.dias

    const veiculos = await Database.rawQuery(`
      DECLARE @dias_historico AS INT = ${historicoDias}
      SELECT a.CODSOCCAV, a.GERACAO, a.CATEGORIA, a.MATRICULA, a.NUM_DEP, P.NOME, a.PLACA, a.DT_STATUS
        , CASE a.STATUS
          WHEN 'E' then 'EXCLUIDO'
          WHEN 'I' then 'ADICIONADO'
          WHEN 'A' THEN 'ALTERADO'
          ELSE 'OUTROS' END STATUS
      FROM SOC_SOCIOS_VEICULOS a WITH(NOLOCK)
      OUTER APPLY DBO.GET_PESSOA_GERACAO(a.GERACAO, a.CATEGORIA, a.MATRICULA,	a.NUM_DEP, 0) P
      WHERE (@dias_historico = 0 AND a.GERACAO = 0 AND a.STATUS <> 'E')
      OR (@dias_historico > 0 AND a.DT_STATUS >= DATEADD(DAY, -@dias_historico, CAST(GETDATE() AS DATE)))
      ORDER BY a.CATEGORIA, a.MATRICULA, a.NUM_DEP`)

    return response.json(veiculos)
  }
}
