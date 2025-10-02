/**
 * 扣子 (Coze) API 服务
 * 实现文件上传和工作流调用功能
 */

interface CozeConfig {
  apiToken: string;
  workflowId: string;
  baseUrl: string;
}

interface FileUploadResponse {
  code: number;
  msg: string;
  data: {
    file_id: string;
    file_name: string;
    file_size: number;
    file_type: string;
  };
}

interface WorkflowRunResponse {
  code: number;
  msg: string;
  data: {
    execute_id: string;
    workflow_id: string;
  };
}

interface WorkflowResultResponse {
  code: number;
  msg: string;
  data: {
    execute_id: string;
    status: 'running' | 'success' | 'failed';
    result?: any;
    error_msg?: string;
  };
}

export class CozeApiService {
  private config: CozeConfig;

  constructor(config: CozeConfig) {
    this.config = config;
  }

  /**
   * 上传文件到扣子平台
   */
  async uploadFile(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.config.baseUrl}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`文件上传失败: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 运行工作流
   */
  async runWorkflow(fileId: string, language: string = 'zh'): Promise<WorkflowRunResponse> {
    const response = await fetch(`${this.config.baseUrl}/workflows/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_id: this.config.workflowId,
        parameters: {
          file_id: fileId,
          language: language,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`工作流运行失败: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 获取工作流执行结果
   */
  async getWorkflowResult(executeId: string): Promise<WorkflowResultResponse> {
    const response = await fetch(`${this.config.baseUrl}/workflows/runs/${executeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`获取工作流结果失败: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 轮询获取工作流最终结果
   */
  async waitForWorkflowResult(executeId: string, maxAttempts: number = 30): Promise<any> {
    for (let i = 0; i < maxAttempts; i++) {
      const result = await this.getWorkflowResult(executeId);
      
      if (result.data.status === 'success') {
        return result.data.result;
      } else if (result.data.status === 'failed') {
        throw new Error(result.data.error_msg || '工作流执行失败');
      }
      
      // 等待2秒后重试
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('工作流执行超时');
  }

  /**
   * 完整的图片转提示词流程
   */
  async imageToPrompt(file: File, language: string = 'zh'): Promise<string> {
    try {
      // 1. 上传文件
      const uploadResult = await this.uploadFile(file);
      if (uploadResult.code !== 0) {
        throw new Error(uploadResult.msg || '文件上传失败');
      }

      // 2. 运行工作流
      const runResult = await this.runWorkflow(uploadResult.data.file_id, language);
      if (runResult.code !== 0) {
        throw new Error(runResult.msg || '工作流启动失败');
      }

      // 3. 等待并获取结果
      const finalResult = await this.waitForWorkflowResult(runResult.data.execute_id);
      
      return finalResult.prompt || finalResult.text || '生成的提示词';
    } catch (error) {
      console.error('图片转提示词失败:', error);
      throw error;
    }
  }
}

// 创建默认实例
export function createCozeApiService(): CozeApiService {
  const config: CozeConfig = {
    apiToken: process.env.COZE_API_TOKEN || '',
    workflowId: process.env.COZE_WORKFLOW_ID || '',
    baseUrl: process.env.COZE_API_BASE_URL || 'https://www.coze.cn/api/v1',
  };

  // 在生产环境中，如果没有配置COZE API，返回一个模拟服务
  if (!config.apiToken || !config.workflowId) {
    console.warn('COZE API未配置，使用模拟服务');
    return new MockCozeApiService();
  }

  return new CozeApiService(config);
}

// 模拟COZE API服务，用于演示
class MockCozeApiService extends CozeApiService {
  constructor() {
    super({
      apiToken: 'mock',
      workflowId: 'mock',
      baseUrl: 'mock'
    });
  }

  async imageToPrompt(file: File, language: string = 'zh'): Promise<string> {
    // 模拟处理时间
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPrompts = {
      zh: '这是一张美丽的图片，包含了丰富的色彩和细节。图片展现了自然的美感，光线柔和，构图平衡。',
      en: 'This is a beautiful image with rich colors and details. The picture shows natural beauty with soft lighting and balanced composition.',
      es: 'Esta es una hermosa imagen con colores ricos y detalles. La imagen muestra la belleza natural con iluminación suave y composición equilibrada.',
      fr: 'Ceci est une belle image avec des couleurs riches et des détails. L\'image montre la beauté naturelle avec un éclairage doux et une composition équilibrée.'
    };

    return mockPrompts[language as keyof typeof mockPrompts] || mockPrompts.zh;
  }
}