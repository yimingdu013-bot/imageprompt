import { NextRequest, NextResponse } from 'next/server';
import { createCozeApiService } from '~/lib/coze-api';

export async function POST(request: NextRequest) {
  try {
    // 获取表单数据
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'zh';

    if (!file) {
      return NextResponse.json(
        { error: '请选择要上传的图片文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件类型，请上传 JPEG、PNG、GIF 或 WebP 格式的图片' },
        { status: 400 }
      );
    }

    // 验证文件大小 (最大 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小不能超过 10MB' },
        { status: 400 }
      );
    }

    // 创建扣子API服务实例
    const cozeService = createCozeApiService();

    // 调用图片转提示词服务
    const prompt = await cozeService.imageToPrompt(file, language);

    return NextResponse.json({
      success: true,
      prompt: prompt,
      message: '提示词生成成功'
    });

  } catch (error) {
    console.error('图片转提示词API错误:', error);
    
    // 根据错误类型返回不同的错误信息
    let errorMessage = '生成提示词时发生错误，请稍后重试';
    
    if (error instanceof Error) {
      if (error.message.includes('配置不完整')) {
        errorMessage = '服务配置错误，请联系管理员';
      } else if (error.message.includes('上传失败')) {
        errorMessage = '图片上传失败，请检查网络连接';
      } else if (error.message.includes('工作流')) {
        errorMessage = '提示词生成服务暂时不可用，请稍后重试';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}