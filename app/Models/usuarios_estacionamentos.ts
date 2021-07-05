/* eslint-disable @typescript-eslint/naming-convention */
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class usuarios_estacionamentos extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(usuariosEstacionamentos: usuarios_estacionamentos) {
    if (usuariosEstacionamentos.$dirty.password) {
      usuariosEstacionamentos.password = await Hash.make(usuariosEstacionamentos.password)
    }
  }
}
