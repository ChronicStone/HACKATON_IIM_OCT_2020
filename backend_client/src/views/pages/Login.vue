<!--  -->

<template>
<div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">

    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
        <vx-card>
            <div slot="no-body" class="full-page-bg-color">
                <div class="vx-row no-gutter justify-center items-center">
                    <div class="vx-col hidden lg:block lg:w-1/2" style="background-image:url('@/assets/images/pages/login.png');text-align: center;">
                        <span style="font-size:22px;">LOGO APP</span>
                    </div>

                    <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                        <div class="p-8 login-tabs-container">
                            <div class="vx-card__title mb-4">
                                <h4 class="mb-4">Retirement home backend</h4>
                                <p>Welcome back, please login to your account.</p>
                            </div>
                            <ValidationObserver ref="form">
                                <div class="pb-8">
                                    <ValidationProvider name="email" :rules="{ required: true }" v-slot="{ errors }">
                                        <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="Email" v-model="input.email" class="w-full" />
                                        <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0">
                                            <span>{{ errors[0] }}</span>
                                        </vs-alert>
                                    </ValidationProvider>

                                    <ValidationProvider name="password" :rules="{ required: true }" v-slot="{ errors }">
                                        <vs-input type="password" name="password" icon-no-border icon="icon icon-lock" icon-pack="feather" label-placeholder="Password" v-model="input.password" class="w-full mt-6" />
                                        <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0">
                                            <span>{{ errors[0] }}</span>
                                        </vs-alert>
                                    </ValidationProvider>

                                    <div class="flex flex-wrap justify-between my-5">
                                        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                                        <span @click="isAskNewPassword = true" style="cursor:pointer;" class="hover:text-primary">Forgot password?</span>
                                    </div>
                                    <vs-button @click.prevent="checkLogin()" ref="loadableButton" id="button-with-loading" class="vs-con-loading__container float-right">Login</vs-button>
                                </div>
                            </ValidationObserver>
                            <vs-alert v-if="errLog.state === true" color="danger" icon-pack="feather" icon="icon-info" class="mt-6 p-0">
                                <span>{{ errLog.message }}</span>
                            </vs-alert>
                        </div>
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</div>
</template>

<script>
import md5 from "md5";
// import VuePassword from 'vue-password';

export default {
    components: {
        // VPassword
    },
    data() {
        return {
            emailAskNewPass: '',
            isAskNewPassword: false,

            isResetPassword: false,
            resetPass: {
                password: '',
                password_conf: '',
            },
            resetPassStr: 0,
            resetPassStrConf: 0,
            input: {
                email: "",
                password: ""
            },
            checkbox_remember_me: true,
            backgroundLoading: "primary",
            colorLoading: "#fff",
            errLog: {
                state: false,
                message: ""
            }
        };
    },
    beforeCreate: function () {
        if (JSON.parse(localStorage.getItem("managerUser")).data) {
            this.$router.push("../");
        }
    },
    watch: {
        "resetPass.password": function (val) {
            var str = 0
            if (val.match(/[a-z]+/)) {
                str++
            }
            if (val.match(/[A-Z]+/)) {
                str++
            }
            if (val.match(/[0-9]+/)) {
                str++
            }
            if (val.match(/[$@#&!]+/)) {
                str++
            }
            this.resetPassStr = str
        },
        "resetPass.password_conf": function (val) {
            var str = 0
            if (val.match(/[a-z]+/)) {
                str++
            }
            if (val.match(/[A-Z]+/)) {
                str++
            }
            if (val.match(/[0-9]+/)) {
                str++
            }
            if (val.match(/[$@#&!]+/)) {
                str++
            }
            this.resetPassStrConf = str
        }
    },
    methods: {
        checkLogin() {
            this.$refs.form.validate().then(success => {
                if (!success) {
                    return;
                }
                this.openLoadingContained();
                if (this.input.email != "" && this.input.password != "") {
                    var headers = {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    var data = {
                        email: this.input.email,
                        password: md5(this.input.password)
                    };
                    this.$axios
                        .post("/retirement-home/admin/auth", data, headers)
                        .then(response => this.loginLaunch(response.data))
                        .catch((error, response) => {
                            this.errLog.state = true;
                            this.errLog.message = response.data.message;
                        });
                }
            });
        },
        loginLaunch(response) {
            if (response.success === true) {
                const savedData = {
                    accessToken: response.accessToken,
                    data: response.data
                }
                localStorage.setItem('backendUser', JSON.stringify(savedData))
                // if (response.data.password_reset === true) this.isResetPassword = true
                this.$router.push("/");
            } else {
                this.errLog.state = true;
                this.errLog.message = response.message;
            }
        },
        emptyErr() {
            this.errLog.state = false;
            this.errLog.title = "";
            this.errLog.message = "";
        },
        openLoadingContained() {
            this.$vs.loading({
                background: this.backgroundLoading,
                color: this.colorLoading,
                container: "#button-with-loading",
                scale: 0.45
            });
            setTimeout(() => {
                this.$vs.loading.close("#button-with-loading > .con-vs-loading");
            }, 700);
        }
    }
};
</script>

<style lang="scss">
#page-login {
    .social-login-buttons {
        .bg-facebook {
            background-color: #1551b1;
        }

        .bg-twitter {
            background-color: #00aaff;
        }

        .bg-google {
            background-color: #4285f4;
        }

        .bg-github {
            background-color: #333;
        }
    }
}
</style>
