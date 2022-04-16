<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="注册">
          <b-form>
            <b-form-group
              description=""
              label="昵称"
            >
              <b-form-input
                v-model="user.name"
                type="text"
                placeholder="输入您的昵称（选填）"
              ></b-form-input>
            </b-form-group>
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
              label="手机号"
            >
              <b-form-input
                v-model="user.telephone"
                type="number"
                placeholder="输入您的电话"
              ></b-form-input>
              <b-form-invalid-feedback :state="televalidation">
                手机号必须位11位
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="televalidation">
                手机号验证成功
              </b-form-valid-feedback>
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
                @click='register'
                variant="outline-primary"
                block
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        email: '',
        password: '',
      },
      televalidation: null,
      pwvalidation: null,
    };
  },
  methods: {
    ...mapMutations('userModule', ['SET_TOKEN', 'SET_USERINFO']),
    register() {
      if (this.user.telephone.length !== 11) {
        this.televalidation = false;
        return;
      }
      this.televalidation = true;
      if (this.user.password.length <= 6) {
        this.pwvalidation = false;
        return;
      }
      this.pwvalidation = true;
      // 请求
      this.$store.dispatch('userModule/register', this.user).then(() => {
        // 跳转主页
        this.$router.replace({ name: 'home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });
      console.log('register');
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
