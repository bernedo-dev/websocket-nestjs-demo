import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller('base')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary:'Hello World'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
