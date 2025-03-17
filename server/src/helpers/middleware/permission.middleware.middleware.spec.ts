import { PermissionMiddlewareMiddleware } from './permission.middleware';

describe('PermissionMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new PermissionMiddlewareMiddleware()).toBeDefined();
  });
});
