import Role from '#models/role'

export default class RoleSeeder {
  async run() {
    await Role.updateOrCreateMany('name', [
      {
        name: 'owner',
        description: 'Property owner in the society',
      },
      {
        name: 'tenant',
        description: 'Tenant living in the society',
      },
      {
        name: 'admin',
        description: 'Society administrator',
      },
      {
        name: 'super_admin',
        description: 'System super administrator',
      },
    ])
  }
}
