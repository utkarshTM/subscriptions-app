import logger from '@adonisjs/core/services/logger'

class SendResponse {
  static success(message?: string, data?: any) {
    return {
      success: true,  
      message: message || 'Request was successful',
      data: data || null,
    }
  }

  static logError(data?: any) {
    logger.error({ errLog: data }, 'Something went wrong')
    return true
  }

  static error(message: string, code: number, data?: any): any {
    if (data) {
      logger.error({ err: data }, 'Error occurred')
    }

    return {
      success: false,
      error: {
        code: code,
        message: message,
        data: data || null,  
      },
    }
  }
}

export default SendResponse
