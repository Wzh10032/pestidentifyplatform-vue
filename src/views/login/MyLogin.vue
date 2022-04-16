<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="登录">
          <b-form>
            <b-form-group
              description=""
              label="邮箱"
            >
              <b-form-input
                v-model="user.email"
                type="text"
                placeholder="输入您的邮箱"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              description=""
              label="密码"
            >
              <b-form-input
                v-model="user.password"
                type="password"
                placeholder="输入您的密码"
              ></b-form-input>
              <b-form-invalid-feedback :state="pwvalidation">
                密码长度必须大于六位
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="pwvalidation">
                密码长度合格
              </b-form-valid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click='login'
                variant="outline-primary"
                block
              >登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      televalidation: null,
      pwvalidation: null,
    };
  },
  methods: {
    ...mapActions('userModule', { userlogin: 'login' }),
    login() {
      if (this.user.password.length <= 6) {
        this.pwvalidation = false;
        return;
      }
      this.pwvalidation = true;
      // 请求
      this.userlogin(this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });
      console.log('login');
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
