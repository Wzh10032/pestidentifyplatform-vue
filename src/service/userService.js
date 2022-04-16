import request from '@/utils/request';

// 用户注册
const register = (name, email, telephone, password) => {
  return request.post('auth/register', name, email, telephone, password);
};
// 用户登录
const login = ({ email, password }) => {
  return request.post('auth/login', { email, password });
};
// 获取用户信息
const info = () => {
  return request.get('auth/info');
};
export default {
  register,
  login,
  info,
};
