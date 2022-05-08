import request from '@/utils/request';

// 用户注册
const register = (name, email, telephone, password) => {
  return request.post('http://81.69.185.195:8504/api/auth/register', name, email, telephone, password);
};
// 用户登录
const login = ({ email, password }) => {
  return request.post('http://81.69.185.195:8504/api/auth/login', { email, password });
};
// 获取用户信息
const info = () => {
  return request.get('http://81.69.185.195:8504/api/auth/info');
};
export default {
  register,
  login,
  info,
};
