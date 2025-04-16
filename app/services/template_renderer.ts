// app/services/template_renderer.ts
import { Edge } from 'edge.js'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class TemplateRenderer {
  private edge: Edge

  constructor() {
    this.edge = new Edge({ cache: false })
    // Mount the emails namespace to the correct path
    this.edge.mount('emails', join(__dirname, '../resources/views/emails'))
  }

  async render(template: string, data: Record<string, any>) {
    try {
      return await this.edge.render(`emails::${template}`, data)
    } catch (error) {
      console.error('Template rendering error:', error)
      throw error
    }
  }
}
