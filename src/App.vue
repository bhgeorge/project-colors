<template>
  <div id="app" class="c-site">
    <a
      id="skip-link"
      class="u-visually-hidden u-visually-hidden--focus u-bg-red-dark u-c-white u-p"
      href="#site-main"
    >
        Skip to content
    </a>
    <header :class="classNames">
      <button class="c-site-nav-toggle u-d-none@m" type="button" @click="toggleNav">
        <Icon :type="type" />
        <span class="u-visually-hidden">Toggle navigation</span>
      </button>
      <div class="c-pattern c-pattern--dimaa"></div>
      <nav class="c-site-nav">
        <div class="o-cover-link u-p-s c-site-nav__header">
          <p>
            <router-link :to="{ name: 'home' }" class="o-cover-link__item h5 u-font-bold">
              Project Colors
            </router-link>
          </p>
        </div>
        <ul class="o-list-bare">
          <li
            v-for="link in nav"
            :key="link.route"
            :class="{ 'o-list-bare__item': true,
                'c-site-nav__item': true,
                'active': activeSubdir === link.route }"
          >
            <router-link
              :to="{ name: link.route }"
              class="c-site-nav__link u-p-vert-xs u-p-horiz-s"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>
        <div class="c-site-nav__copyright">
          <p class="u-font-xs u-c-gray-light">v{{ versionNumber }}</p>
        </div>
      </nav>
    </header>
    <main id="site-main" class="c-site-main">
      <router-view/>
    </main>
    <portal-target name="modal" slim />
    <div aria-live="polite">
      <transition-group
        name="c-alert-trans"
        tag="div"
        mode="out-in"
        class="c-alert__global-container"
      >
        <div
          v-for="(alert, index) in alerts"
          :key="alert.id"
          :class="alert.classes"
        >
          <button
            class="c-alert__close"
            type="button"
            name="closeGlobalAlert"
            @click="closeAlert(index)"
          >
            <Icon type="close" />
            <span class="u-visually-hidden">Close alert</span>
          </button>
          <h4 class="c-alert__title">{{ alert.title }}</h4>
          <p v-if="alert.text" v-html="alert.text"></p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { findIndex } from 'underscore';
import Icon from '@/components/Icon';
import nav from '@/../public/json/nav.json';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      alertTimeouts: {},
      lastAlertSize: 0,
      navActive: false,
      nav,
      showExport: false,
      showImport: false,
      // TODO: pull this from somewhere
      versionNumber: '0.0.1',
    };
  },
  metaInfo: {
    title: 'Brian George',
    titleTemplate: '%s | Brian George',
  },
  computed: {
    type() {
      return this.navActive ? 'close' : 'more';
    },
    classNames() {
      const classNames = ['c-site-header'];
      if (this.navActive) {
        classNames.push('active');
      }
      return classNames;
    },
    activeSubdir() {
      if (this.$route && this.$route.name) {
        return this.$route.name.split('.')[0];
      }
      return null;
    },
    alerts() {
      return this.$store.state.core.alerts;
    },
  },
  methods: {
    toggleNav() {
      this.navActive = !this.navActive;
    },
    closeAlert(index) {
      this.$store.dispatch('core/closeAlert', index);
      this.lastAlertSize -= 1;
    },
  },
  watch: {
    $route() {
      // Close the nav on route change
      if (this.navActive) {
        this.navActive = false;
      }
    },
    alerts() {
      if (this.lastAlertSize < this.alerts.length) {
        this.lastAlertSize = this.alerts.length;
        const delay = 2500;
        const that = this;

        const newAlertId = this.alerts[this.alerts.length - 1].id;
        setTimeout(() => {
          const index = findIndex(that.alerts, { id: newAlertId });
          if (index !== -1) {
            this.$store.dispatch('core/closeAlert', index);
            this.lastAlertSize -= 1;
          }
        }, delay);
      }
    },
  },
};
</script>
